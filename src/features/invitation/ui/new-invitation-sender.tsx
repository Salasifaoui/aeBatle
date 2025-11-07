import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useRespondInvitation } from "@/src/features/invitation/hooks/useRespondInvitation";
import { Invitation } from "@/src/types/invitation";

type RefreshCallbacks = {
  refreshSent?: () => Promise<void>;
  refreshReceived?: () => Promise<void>;
  refreshRejected?: () => Promise<void>;
};

export default function NewInvitationSender({ 
  invitations, 
  refreshCallbacks 
}: { 
  invitations: Invitation[];
  refreshCallbacks?: RefreshCallbacks;
}) {
  const { reject } = useRespondInvitation(refreshCallbacks);
  
  if (!invitations || !invitations.length ) return null;
  return (
    <Box className="mt-4">
      <Text className="text-lg font-bold mb-2">Sent Invitations (Pending)</Text>
      <VStack space="md">
        {invitations.map((inv: Invitation) => {
          return (
            <Box key={(inv as any).$id || inv.id} className="p-3 rounded-2xl bg-white border border-gray-200">
              <HStack className="items-center justify-between">
                <VStack>
                  <Text className="text-base font-semibold">You invited: {inv.receiver?.username || 'Unknown'}</Text>
                  <Text className="text-xs text-gray-500">To play: {inv.gameId?.name}</Text>
                  <Text className="text-xs text-gray-500">Balance for battle: {inv.balance_for_battle} Ae</Text>
                  {!!inv.message && <Text className="text-xs text-gray-500">Message: {inv.message}</Text>}
                </VStack>
                <Button
                  action="negative"
                  variant="solid"
                  className="rounded-xl"
                  onPress={async () => {
                    await reject(inv, 'Sender cancelled the invitation');
                  }}
                >
                  <ButtonText>Cancel</ButtonText>
                </Button>
              </HStack>
            </Box>
          );
        })}
      </VStack> 
    </Box>
  );
}