import { aeSdk } from "../services";

export class AccountsService {
    
  static async getAccount(address: string) {
    const account = await aeSdk.getAccount({ address: address as `ct_${string}` | `ak_${string}` });
    return account;
  }
}