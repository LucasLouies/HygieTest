import { API } from "../api";

export type Brasserie = {
    "id": string;
    "name": string;
    "logo": string;
}

export async function getAllBrasseries() {
    const response = await API.GET("Brasseries");
    if (response.ok) {
        const reponseBrasserie = await response.json() as Brasserie[];
        return reponseBrasserie;
    }

    return null;
}