import { API } from "../api";
import type { Biere } from "./getAllBieres";

export async function getAllBieresFromBrasserieId(brasserieId: string) {
    const response = await API.GET("Bieres/Brasserie/" + brasserieId);

    if (response.ok) {
        const biereReponse = await response.json() as Biere[];
        return biereReponse;
    }

    return null;
}