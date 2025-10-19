import { API } from "../api"

export type Stock = {
    "bieresId": string,
    "grosssistesId": string,
    quantite: number
}

/**
 * 
 * @param uidGrossiste le guid du grossiste dont on veut connaitre le stock
 * @returns un tableau de stock ou null en cas d'échec
 */

export async function getStockFromGrossiste(uidGrossiste: string) {
    const response = await API.GET("Stocks/Grossiste/" + uidGrossiste);

    if (response.ok) {
        const reponseStock = await response.json() as Stock[];
        return reponseStock;
    }

    return null;
}