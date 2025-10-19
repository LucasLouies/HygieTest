import { API } from "../api";
import type { Biere } from "./getAllBieres";

/**
 * @param grossisteId le guid d'un grossiste
 * @returns un tableau de biere
 */

export async function getAllBiereFromGrossisteId(grossisteId: string) {
    const response = await API.GET("Bieres/Grossiste/" + grossisteId);

    if (response.ok) {
        const biereReponse = await response.json() as Biere[];
        return biereReponse;
    }

    return null;
}