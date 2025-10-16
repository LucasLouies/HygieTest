import { API } from "../api"

export type Stock = {
    "bieresId": string,
    "grosssistesId": string,
    quantite: number
}

export async function getStockFromGrossiste(uidGrossiste: string) {
    const response = await API.GET("Stocks/Grossiste/" + uidGrossiste);

    if (response.ok) {
        const reponseStock = await response.json() as Stock[];
        return reponseStock;
    }

    return null;
}