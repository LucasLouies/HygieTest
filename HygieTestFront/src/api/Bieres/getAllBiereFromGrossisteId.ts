import { API } from "../api";
import type { Biere } from "./getAllBieres";

export async function getAllBiereFromGrossisteId(grossisteId: string) {
    const response = await API.GET("Bieres/Grossiste/" + grossisteId);

    if (response.ok) {
        const biereReponse = await response.json() as Biere[];
        return biereReponse;
    }

    return null;
}