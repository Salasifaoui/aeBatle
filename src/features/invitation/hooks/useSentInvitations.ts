import { invitationService } from '@/src/features/invitation/services/invitationService';
import { invitationsAtom, invitationsLoadingAtom, lastInvitationsSyncAtAtom } from '@/src/features/invitation/store/invitationsAtoms';
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';

export function useSentInvitations(userId: string | undefined, options: { refreshIntervalMs?: number } = {}) {
  const { refreshIntervalMs = 15000 } = options;
  const [invitations, setInvitations] = useAtom(invitationsAtom);
  const [loading, setLoading] = useAtom(invitationsLoadingAtom);
  const [, setLastSyncAt] = useAtom(lastInvitationsSyncAtAtom);

  useEffect(() => {
    if (!userId) return;
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const list = await invitationService.listSentByUser(userId, 'rejected');
        if (mounted) {
          setInvitations(list);
          setLastSyncAt(Date.now());
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    if (refreshIntervalMs > 0) {
      const interval = setInterval(load, refreshIntervalMs);
      return () => {
        mounted = false;
        clearInterval(interval);
      };
    }
    return () => { mounted = false; };
  }, [userId, refreshIntervalMs, setInvitations, setLoading, setLastSyncAt]);

  const rejected = useMemo(() => invitations.filter(i => i.status === 'rejected'), [invitations]);

  return { invitations, rejected, loading };
}


