import { fetchGames } from "@/src/features/games/services/gamesService";
import {
    gamesListAtom,
    gamesLoadingAtom,
    lastGamesSyncAtAtom,
} from "@/src/features/games/store/gamesAtoms";
import { useAtom } from "jotai";
import { useEffect } from "react";

export function useGames(options?: { refreshIntervalMs?: number }) {
  const [games, setGames] = useAtom(gamesListAtom);
  const [loading, setLoading] = useAtom(gamesLoadingAtom);
  const [, setLastSyncAt] = useAtom(lastGamesSyncAtAtom);

  useEffect(() => {
    let isMounted = true;
    let interval: ReturnType<typeof setInterval> | undefined;

    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchGames();
        if (isMounted) {
          setGames(data);
          setLastSyncAt(Date.now());
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    load();

    const refreshMs = options?.refreshIntervalMs ?? 15000;
    if (refreshMs > 0) {
      interval = setInterval(load, refreshMs);
    }

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  return { games, loading };
}


