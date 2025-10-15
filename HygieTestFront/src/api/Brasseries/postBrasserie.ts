import { API } from "../api"
import type { Brasserie } from "./getAllBrasseries"

export type PostBrasserie = {
    "name": string,
    "logoFile": File
}

export type PostBrasserieResponse = {
    brasserieAjoute: Brasserie
}

export async function postBrasserie(brasserie: PostBrasserie) {
    const formData = new FormData();
    formData.append("Name", brasserie.name);
    formData.append("LogoFile", brasserie.logoFile);

    const response = await API.POSTWITHFILE("Brasseries", formData);

    if (response.ok) {
        const responseBrasserie = await response.json() as PostBrasserieResponse;
        return responseBrasserie;
    }

    return null
}