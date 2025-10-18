import { API } from "../api";

export type Biere = {
    "id": string,
    "name": string,
    "degre": number,
    "prix": number,
    "logo": string,
    "brasseriesId": string

}

export async function getAllBieres() {
    const response = await API.GET("Bieres");
    if (response.ok) {
        const reponseBiere = await response.json() as Biere[];
        return reponseBiere;
    }

    return null;
}