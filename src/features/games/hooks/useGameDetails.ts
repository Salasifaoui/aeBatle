import { fetchGameById } from "@/src/features/games/services/gamesService";
import {
    selectedGameAtom,
    selectedGameIdAtom,
} from "@/src/features/games/store/gamesAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function useGameDetails(gameId?: string, options?: { refreshIntervalMs?: number }) {
  const [, setSelectedId] = useAtom(selectedGameIdAtom);
  const [selectedGame, setSelectedGame] = useAtom(selectedGameAtom);

  useEffect(() => {
    if (!gameId) return;
    let isMounted = true;
    let interval: ReturnType<typeof setInterval> | undefined;
    setSelectedId(gameId);

    const load = async () => {
      const data = await fetchGameById(gameId);
      if (isMounted) setSelectedGame(data);
    };

    load();

    const refreshMs = options?.refreshIntervalMs ?? 10000;
    if (refreshMs > 0) interval = setInterval(load, refreshMs);

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, [gameId]);

  return { game: selectedGame };
}


