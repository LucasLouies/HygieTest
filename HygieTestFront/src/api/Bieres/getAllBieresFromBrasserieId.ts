import { API } from "../api";
import type { Biere } from "./getAllBieres";

/**
 * @param brasserieId le guid d'une brasserie
 * @returns un tableau de biere
 */

export async function getAllBieresFromBrasserieId(brasserieId: string) {
    const response = await API.GET("Bieres/Brasserie/" + brasserieId);

    if (response.ok) {
        const biereReponse = await response.json() as Biere[];
        return biereReponse;
    }

    return null;
}