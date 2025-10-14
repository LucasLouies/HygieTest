import { API } from "../api"
import type { Biere } from "./getAllBieres"

export type PostBiere = {
    "name": string,
    "degre": number,
    "prix": number
}

export type PostBiereResponse = {
    biereAjoute: Biere
}

export async function postBiere(biere: PostBiere) {
    const response = await API.POST("Bieres", biere);

    if (response.ok) {
        const reponseBiere = await response.json() as PostBiereResponse;
        return reponseBiere;
    }

    return null;
}