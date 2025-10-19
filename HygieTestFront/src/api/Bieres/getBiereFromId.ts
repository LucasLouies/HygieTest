import { API } from "../api";
import type { Biere } from "./getAllBieres";

/**
 * @param idBiere le guid d'une biere
 * @returns la biere lié au guid
 */

export async function getBiereFromId(idBiere: string) {

    const response = await API.GET("Bieres/" + idBiere);
    if (response.ok) {
        const biere = await response.json() as Biere;
        return biere;
    }

    return null;
}