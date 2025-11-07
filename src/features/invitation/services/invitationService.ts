import { APP_CONFIG } from "@/src/config";
import {
  createDocument,
  databases,
  listDocuments,
  updateDocument,
} from "@/src/services/apiService";
import { Invitation } from "@/src/types/invitation";
import { User } from "@/src/types/user";
import { ID, Query } from "react-native-appwrite";

type CreateInvitationInput = {
  gameId: string;
  sender: User;
  receiver: User;
  balance_for_battle: number;
  message?: string;
};

export const invitationService = {
  async create(input: CreateInvitationInput): Promise<Invitation> {
    const { gameId, sender, receiver, balance_for_battle, message } = input;
    const docId = ID.unique();
    const payload = {
      gameId,
      balance_for_battle,
      status: "pending" as const,
      message: message || "",
      // Store IDs only to avoid virtual attribute queries
      sender: sender.userId,
      receiver: receiver.userId,
    } as const;
    try {
      const created = await createDocument(
        APP_CONFIG.INVITATION_COLLECTION,
        docId,
        payload
      );

      return created as unknown as Invitation;
    } catch (error) {
      console.error("create invitation error", error);
      throw error;
    }
  },

  async listReceivedByUser(
    userId: string,
    status: "pending" | "accepted" | "rejected"
  ): Promise<Invitation[]> {
    const res = await listDocuments(APP_CONFIG.INVITATION_COLLECTION, [
      Query.and([
        Query.equal("receiver", userId),
        Query.equal("status", status)
      ])
    ] as unknown as string[]);
    const docs = (res as any).documents as any[];
    return docs;
  },

  async listSentByUser(
    userId: string,
    status: "pending" | "accepted" | "rejected"
  ): Promise<Invitation[]> {
    const res = await listDocuments(
      APP_CONFIG.INVITATION_COLLECTION,
      // [Query.orderDesc('$createdAt')] as unknown as string[],
      [
        Query.and([
          Query.equal("status", status),
          Query.equal("sender", userId),
        ])
      ] as unknown as string[]
    );
    const docs = (res as any).documents as any[];
    return docs as Invitation[];
  },

  async updateStatus(
    invitationId: string,
    status: "pending" | "accepted" | "rejected",
    message?: string
  ): Promise<Invitation> {
    const updated = await updateDocument(
      APP_CONFIG.INVITATION_COLLECTION,
      invitationId,
      { status, ...(message ? { message } : {}) }
    );
    return updated as unknown as Invitation;
  },

  async delete(invitationId: string): Promise<boolean> {

    try {
      await databases.deleteDocument(
        APP_CONFIG.DATABASE_ID,
        APP_CONFIG.INVITATION_COLLECTION,
        invitationId
      );
      return true;
    } catch (error) {
      console.error("delete invitation error", error);
      throw error;
    }
  },
};
