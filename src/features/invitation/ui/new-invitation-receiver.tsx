import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRespondInvitation } from "@/src/features/invitation/hooks/useRespondInvitation";
import { Invitation } from "@/src/types/invitation";
import { useRouter } from "expo-router";

type RefreshCallbacks = {
  refreshSent?: () => Promise<void>;
  refreshReceived?: () => Promise<void>;
  refreshRejected?: () => Promise<void>;
};

export default function NewInvitationReceiver({ 
  receiveInvitations,
  refreshCallbacks 
}: { 
  receiveInvitations: Invitation[];
  refreshCallbacks?: RefreshCallbacks;
}) {
  const { accept, reject } = useRespondInvitation(refreshCallbacks);
  const router = useRouter();
  
  if (!receiveInvitations || !receiveInvitations.length) return null;
  
  return (
    <Box className="mt-4">
      <Text className="text-lg font-bold mb-2">Received Invitations (Pending)</Text>
      <VStack space="md">
        {receiveInvitations.map((inv: Invitation) => {
          return (
            <Box key={(inv as any).$id || inv.id} className="p-3 rounded-2xl bg-white border border-gray-200">
              <HStack className="items-center justify-between">
                <VStack>
                  <Text className="text-base font-semibold">Invitation From: {inv.sender?.username || 'Unknown'}</Text>
                  <Text className="text-xs text-gray-500">Balance for battle: {inv.balance_for_battle} AE</Text>
                  <Text className="text-xs text-gray-500">Game: {inv.gameId?.name}</Text>
                  {!!inv.message && <Text className="text-xs text-gray-500">Message: {inv.message}</Text>}
                </VStack>
                <HStack className="items-center gap-2">
                  <Button
                    action="positive"
                    variant="solid"
                    className="rounded-xl"
                    onPress={async () => {
                      const res = await accept(inv);
                      if (res) {
                        router.push({ pathname: '/(games)/game-details', params: { id: inv.gameId.$id } });
                      }
                    }}
                  >
                    <ButtonText>Accept</ButtonText>
                  </Button>
                  <Button
                    action="negative"
                    variant="outline"
                    className="rounded-xl"
                    onPress={async () => {
                      await reject(inv, 'User rejected the invitation');
                    }}
                  >
                    <ButtonText>Reject</ButtonText>
                  </Button>
                </HStack>
              </HStack>
            </Box>
          );
        })}
      </VStack> 
    </Box>
  );
}