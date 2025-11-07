import { VStack } from "@/components/ui/vstack";
import { useAuth } from "../../auth";
import { useInvitations, useReceiveInvitations } from "../hooks/useInvitations";
import NewInvitationReceiver from "./new-invitation-receiver";
import NewInvitationSender from "./new-invitation-sender";
import RejectedInvitationCard from "./rejected-invitation-card";

export default function InvitationView() {
  const { profile } = useAuth();
  // Pending invitations sent by the user (sender can reject)
  const { invitations: pendingSentInvitations, refresh: refreshPendingSent } = useInvitations(profile?.userId, 'pending');
  // Pending invitations received by the user (receiver can accept/reject)
  const { receiveInvitations: pendingReceivedInvitations, refresh: refreshPendingReceived } = useReceiveInvitations(profile?.userId, 'pending');
  // Rejected invitations sent by the user (sender can delete)
  const { invitations: rejectedSentInvitations, refresh: refreshRejectedSent } = useInvitations(profile?.userId, 'rejected');

  return (
    <VStack className="gap-4">
      <NewInvitationSender 
        invitations={pendingSentInvitations} 
        refreshCallbacks={{
          refreshSent: refreshPendingSent,
          refreshReceived: refreshPendingReceived,
          refreshRejected: refreshRejectedSent,
        }}
      />
      <NewInvitationReceiver 
        receiveInvitations={pendingReceivedInvitations}
        refreshCallbacks={{
          refreshSent: refreshPendingSent,
          refreshReceived: refreshPendingReceived,
          refreshRejected: refreshRejectedSent,
        }}
      />
      <RejectedInvitationCard 
        invitations={rejectedSentInvitations}
        refreshCallbacks={{
          refreshRejected: refreshRejectedSent,
        }}
      />
    </VStack>
  );
}
