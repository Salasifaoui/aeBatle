import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { CardHero } from "@/src/components";
import InputForm from "@/src/components/InputForm";
import ZixActionSheet from "@/src/components/ZixActionSheet";
import { useAuth } from "@/src/features/auth";
import { useGames } from "@/src/features/games/hooks/useGames";
import { useSendInvitation } from "@/src/features/invitation/hooks/useSendInvitation";
import { profileService } from "@/src/features/profile/service/profileService";
import { User } from "@/src/types/user";
import { useEffect, useMemo, useState } from "react";
import { FlatList } from "react-native";

type Props = { gameId?: string };

export default function InvitationList({ gameId }: Props) {
  const { profile: me } = useAuth();
  const { games } = useGames({ refreshIntervalMs: 0 });
  const [users, setUsers] = useState<User[]>([]);
  const { send, sending } = useSendInvitation();
  const [isOpen, setIsOpen] = useState(false);
  const effectiveGameId = useMemo(
    () => gameId || games?.[0]?.$id || "",
    [gameId, games]
  );
  const [message, setMessage] = useState("");
  const [balance_for_battle, setBalanceForBattle] = useState(0);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await profileService.listUsers();
      if (!mounted) return;
      setUsers(list.filter((u) => u.userId !== me?.userId));
    })();
    return () => {
      mounted = false;
    };
  }, [me?.userId]);

  const handleSendInvitation = () => {
    if (!selectedUser) return;
    if (!me || !effectiveGameId) return;
    send({
      gameId: String(effectiveGameId),
      sender: me,
      receiver: selectedUser,
      balance_for_battle: balance_for_battle,
      message: message,
    });
    if (!sending) {
      setIsOpen(false);
      setSelectedUser(null);
      setMessage("");
      setBalanceForBattle(0);
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <HStack className="items-center justify-between py-3 border-b border-gray-200">
      <HStack className="items-center gap-3 flex-1">
        <Avatar size="md" className="bg-gray-200">
          {item.imageUrl ? (
            <AvatarImage
              source={{ uri: item.imageUrl }}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <AvatarFallbackText>
              {(item.username || "U").charAt(0)}
            </AvatarFallbackText>
          )}
        </Avatar>
        <VStack className="flex-1">
          <Text className="text-base font-semibold">{item.username}</Text>
          {!!item.address && (
            <Text className="text-xs text-gray-500">{item.address}</Text>
          )}
        </VStack>
      </HStack>
      <Button
        action="positive"
        variant="solid"
        className="rounded-xl"
        onPress={() => {
          setIsOpen(true);
          setSelectedUser(item);
        }}
      >
        <ButtonText>Invitation</ButtonText>
      </Button>
    </HStack>
  );

  return !!users.length ? (
    <VStack space="md" className="mb-6">
      <Text className="text-xl font-bold text-gray-900">Invite Players</Text>
      <Box className="mt-4">
        <Text className="text-lg font-bold mb-2">Players</Text>
        <FlatList
          data={users}
          keyExtractor={(u) => u.userId}
          renderItem={renderItem}
          scrollEnabled={false}
        />
      </Box>
      <ZixActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Invitation"
        subtitle="Invitation to play a game"
      >
        <CardHero className="gap-4 w-full">
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Enter message"
              value={message}
              onChangeText={setMessage}
              text="Message"
              textAlign="left"
              onBlur={() => {}}
            />
          </CardHero>
          <CardHero>
            <InputForm
              variant="rounded"
              placeholder="Enter balance for battle"
              value={String(balance_for_battle)}
              onChangeText={(value) => setBalanceForBattle(Number(value))}
              onBlur={() => {}}
              keyboardType="numeric"
              text="Balance for battle"
              textAlign="left"
            />
          </CardHero>
          <Button
            action="positive"
            variant="solid"
            className="rounded-xl"
            onPress={() => {
              handleSendInvitation();
            }}
          >
            {sending && <ButtonSpinner color="gray" />}
            <ButtonText>Send</ButtonText>
          </Button>
        </CardHero>
      </ZixActionSheet>
    </VStack>
  ) : null;
}
