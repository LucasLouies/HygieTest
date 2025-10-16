import { API } from "../api"
import type { Stock } from "./getStockFromGrossiste";

export type PostStock = {
    "biereId": string,
    "grossisteId": string,
    "quantite": number
}

export async function postStock({ biereId, grossisteId, quantite }: PostStock) {
    const tmpStock: PostStock = {
        biereId: biereId,
        grossisteId: grossisteId,
        quantite: quantite
    }

    const response = await API.POST("Stocks", tmpStock);
    if (response.ok) {
        return await response.json() as Stock;
    }

    return null;
}