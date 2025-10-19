import { API } from "../api"
import type { Stock } from "./getStockFromGrossiste";

export type PostStock = {
    "biereId": string,
    "grossisteId": string,
    "quantite": number
}

/**
 * @param biereId le guid de la biere
 * @param grossisteId le guid du grossiste
 * @param quantite la nouvelle quantité en stock
 * @returns le stock qui a été insérer en db ou null en cas d'echec
 */

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