import { User } from "./user";
export interface Game {
  id: string;
  name: string;
  numberUser: number;
  bgcolor?: string;
  nbre_online: number;
  status: string;
  imageUrl?: string;
  ownerName?: string;
  about?: string;
  top: User[];
}