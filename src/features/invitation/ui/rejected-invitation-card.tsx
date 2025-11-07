import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import ButtonAction from "@/src/components/ButtonAction";
import { Invitation } from "@/src/types/invitation";
import { Trash } from "lucide-react-native";
import { Alert } from "react-native";
import { useRespondInvitation } from "../hooks/useRespondInvitation";

type RefreshCallbacks = {
  refreshSent?: () => Promise<void>;
  refreshReceived?: () => Promise<void>;
  refreshRejected?: () => Promise<void>;
};

export default function RejectedInvitationCard({ 
  invitations,
  refreshCallbacks 
}: { 
  invitations: Invitation[];
  refreshCallbacks?: RefreshCallbacks;
}) {
  const { delete: deleteInvitation } = useRespondInvitation(refreshCallbacks);
  
  const handleDeleteInvitation = (inv: Invitation) => {
    Alert.alert('Delete Invitation', 'Are you sure you want to delete this invitation?', [
      { text: 'Cancel', style: 'cancel' },
      { 
        text: 'Delete', 
        onPress: async () => {
          await deleteInvitation(inv);
        }
      },
    ]);
  };
  
  if (!invitations || !invitations.length) return null;
  
  return (
    <Box className="mt-4">
      <Text className="text-lg font-bold mb-2">Rejected Invitations</Text>
      <VStack space="md">
        {invitations.map((inv: Invitation) => (
          <HStack key={(inv as any).$id || inv.id} className="p-3 rounded-2xl bg-white border border-gray-200 items-center justify-between">
            <Box>
              <VStack>
                <Text className="text-base">
                  Your invitation to {inv.receiver?.username || "Unknown"} was rejected.
                </Text>
                <Text className="text-xs text-gray-500 mt-1">
                  Game: {inv.gameId?.name}
                </Text>
                <Text className="text-xs text-gray-500">
                  Balance: {inv.balance_for_battle} AE
                </Text>
                {!!inv.message && (
                  <Text className="text-xs text-gray-500 mt-1">
                    Message: {inv.message}
                  </Text>
                )}
              </VStack>
            </Box>
            <ButtonAction
              action="negative"
              variant="solid"
              className="rounded-xl"
              iconAs={Trash}
              sizeIcon={20}
              colorIconAs="text-white"
              onPress={() => handleDeleteInvitation(inv)}
            />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}
