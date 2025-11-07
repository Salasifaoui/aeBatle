import { invitationService } from '@/src/features/invitation/services/invitationService';
import { Invitation } from '@/src/types/invitation';
import { useCallback, useState } from 'react';

type RefreshCallbacks = {
  refreshSent?: () => Promise<void>;
  refreshReceived?: () => Promise<void>;
  refreshRejected?: () => Promise<void>;
};

export function useRespondInvitation(refreshCallbacks?: RefreshCallbacks) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const accept = useCallback(async (invitation: Invitation) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await invitationService.updateStatus((invitation as any).$id || (invitation as any).id, 'accepted');
      // Refresh both sent and received invitations after accepting
      await Promise.all([
        refreshCallbacks?.refreshReceived?.(),
        refreshCallbacks?.refreshSent?.(),
      ]);
      return updated;
    } catch (e: any) {
      setError(e?.message || 'Failed to accept invitation');
      return null;
    } finally {
      setLoading(false);
    }
  }, [refreshCallbacks]);

  const reject = useCallback(async (invitation: Invitation, reason?: string) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await invitationService.updateStatus((invitation as any).$id || (invitation as any).id, 'rejected', reason || 'Invitation rejected');
      // Refresh all invitation lists after rejecting
      await Promise.all([
        refreshCallbacks?.refreshReceived?.(),
        refreshCallbacks?.refreshSent?.(),
        refreshCallbacks?.refreshRejected?.(),
      ]);
      return updated;
    } catch (e: any) {
      setError(e?.message || 'Failed to reject invitation');
      return null;
    } finally {
      setLoading(false);
    }
  }, [refreshCallbacks]);

  const deleteInvitation = useCallback(async (invitation: Invitation) => {
    setLoading(true);
    setError(null);
    try {
      // Only allow deletion of rejected invitations
      if (invitation.status !== 'rejected') {
        setError('Only rejected invitations can be deleted');
        return null;
      }
      await invitationService.delete((invitation as any).$id || (invitation as any).id);
      // Refresh rejected invitations after deletion
      await refreshCallbacks?.refreshRejected?.();
      return true;
    } catch (e: any) {
      setError(e?.message || 'Failed to delete invitation');
      return null;
    } finally {
      setLoading(false);
    }
  }, [refreshCallbacks]);

  return { accept, reject, delete: deleteInvitation, loading, error };
}
