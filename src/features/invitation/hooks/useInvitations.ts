import { invitationService } from '@/src/features/invitation/services/invitationService';
import { invitationsAtom, invitationsLoadingAtom, lastInvitationsSyncAtAtom, lastReceiveInvitationsSyncAtAtom, receiveInvitationsAtom, receiveInvitationsLoadingAtom } from '@/src/features/invitation/store/invitationsAtoms';
import { useAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';

export function useInvitations(userId: string | undefined, status: 'pending' | 'accepted' | 'rejected' = 'pending') {
  const [invitations, setInvitations] = useAtom(invitationsAtom);
  const [loading, setLoading] = useAtom(invitationsLoadingAtom);
  const [, setLastSyncAt] = useAtom(lastInvitationsSyncAtAtom);
  const mountedRef = useRef(true);
  
  const load = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const list = await invitationService.listSentByUser(userId, status);
      if (mountedRef.current) {
        setInvitations(list);
        setLastSyncAt(Date.now());
      }
    } catch (error) {
      console.error('error loading invitations', error);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [userId, status, setInvitations, setLoading, setLastSyncAt]);
  
  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { invitations, loading, refresh: load };
}


export function useReceiveInvitations(userId: string | undefined, status: 'pending' | 'accepted' | 'rejected' = 'pending') {
  const [receiveInvitations, setReceiveInvitations] = useAtom(receiveInvitationsAtom);
  const [receiveInvitationsLoading, setReceiveInvitationsLoading] = useAtom(receiveInvitationsLoadingAtom);
  const [, setLastReceiveInvitationsSyncAt] = useAtom(lastReceiveInvitationsSyncAtAtom);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    if (!userId) return;
    setReceiveInvitationsLoading(true);
    try {
      const list = await invitationService.listReceivedByUser(userId, status);
      if (mountedRef.current) {
        setReceiveInvitations(list);
        setLastReceiveInvitationsSyncAt(Date.now());
      }
    } catch (error) {
      console.error('error loading receive invitations', error);
    } finally {
      if (mountedRef.current) setReceiveInvitationsLoading(false);
    }
  }, [userId, status, setReceiveInvitations, setReceiveInvitationsLoading, setLastReceiveInvitationsSyncAt]);

  useEffect(() => {
    mountedRef.current = true;
    load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  return { receiveInvitations, receiveInvitationsLoading, refresh: load };
}