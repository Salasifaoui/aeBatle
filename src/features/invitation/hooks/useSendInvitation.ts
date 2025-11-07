import { invitationService } from '@/src/features/invitation/services/invitationService';
import { Invitation } from '@/src/types/invitation';
import { User } from '@/src/types/user';
import { useCallback, useState } from 'react';

type RefreshCallbacks = {
  refreshSent?: () => Promise<void>;
  refreshReceived?: () => Promise<void>;
  refreshRejected?: () => Promise<void>;
};

export function useSendInvitation(refreshCallbacks?: RefreshCallbacks) {
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const send = useCallback(async (params: { gameId: string; sender: User; receiver: User; balance_for_battle: number; message?: string; }): Promise<Invitation | null> => {
    setSending(true);
    setError(null);
    try {
      const created = await invitationService.create(params);
      // Refresh sent invitations after sending
      await refreshCallbacks?.refreshSent?.();
      return created;
    } catch (e: any) {
      setError(e?.message || 'Failed to send invitation');
      return null;
    } finally {
      setSending(false);
    }
  }, [refreshCallbacks]);

  return { send, sending, error };
}


