import { Game } from "@/src/types/game";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const gamesListAtom = atom<Game[]>([]);
export const gamesLoadingAtom = atom<boolean>(false);
export const selectedGameIdAtom = atom<string | null>(null);
export const selectedGameAtom = atom<Game | null>(null);

// Optional persisted timestamp for last refresh
export const lastGamesSyncAtAtom = atomWithStorage<number | null>(
  "games:lastSyncAt",
  null
);


