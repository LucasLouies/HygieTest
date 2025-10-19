import { API } from "../api";

export type Grossiste = {
    "id": string;
    "name": string;
}

/**
 * @returns tous les grossistes en db
 */

export async function getAllGrossistes() {
    const response = await API.GET("Grossistes");
    if (response.ok) {
        const reponseGrossiste = await response.json() as Grossiste[];
        return reponseGrossiste;
    }

    return null;
}