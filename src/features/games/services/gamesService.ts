import { APP_CONFIG } from "@/src/config";
import { getDocument, listDocuments } from "@/src/services/apiService";
import { Game } from "@/src/types/game";

type AppwriteDocument<T> = T & { $id: string };

function mapGame(doc: AppwriteDocument<any>): Game {
  return {
    id: doc.$id,
    name: doc.name,
    numberUser: Number(doc.numberUser) || 0,
    bgcolor: doc.bgcolor,
    nbre_online: Number(doc.nbre_online) || 0,
    status: doc.status ?? "inactive",
    imageUrl: doc.imageUrl,
    ownerName: doc.ownerName,
    about: doc.about,
    top: Array.isArray(doc.top) ? doc.top : [],
  } as Game;
}

export async function fetchGames(): Promise<Game[]> {
  const res = await listDocuments(APP_CONFIG.GAMES_COLLECTION);
  const docs = (res as any)?.documents || [];
  return docs.map(mapGame);
}

export async function fetchGameById(id: string): Promise<Game> {
  const res = await getDocument(APP_CONFIG.GAMES_COLLECTION, id);
  return mapGame(res as any);
}


