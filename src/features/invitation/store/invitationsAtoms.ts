import { Invitation } from '@/src/types/invitation';
import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const invitationsAtom = atom<Invitation[]>([]);
export const invitationsLoadingAtom = atom<boolean>(false);

export const unreadInvitationsCountAtom = atom((get) => {
  const invitations = get(invitationsAtom);
  return invitations.filter((i) => i.status === 'pending').length;
});

export const lastInvitationsSyncAtAtom = atomWithStorage<number | null>(
  'invitations:lastSyncAt',
  null,
);

// receiveInvitationsAtom
export const receiveInvitationsAtom = atom<Invitation[]>([]);
export const receiveInvitationsLoadingAtom = atom<boolean>(false);
export const unreadReceiveInvitationsCountAtom = atom((get) => {
  const invitations = get(receiveInvitationsAtom);
  return invitations.filter((i) => i.status === 'pending').length;
});
export const lastReceiveInvitationsSyncAtAtom = atomWithStorage<number | null>(
  'receiveInvitations:lastSyncAt',
  null,
);


