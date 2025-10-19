import { API } from "../api"
import type { Biere } from "./getAllBieres"

export type PostBiere = {
    "name": string,
    "degre": number,
    "prix": number,
    "logoFile": File,
    "brasserieId": string
}

export type PostBiereResponse = {
    biereAjoute: Biere
}

/**
 * @param biere la biere à insérer en db
 * @returns la biere qui a été insérée en db ou null en cas d'échec
 */

export async function postBiere(biere: PostBiere) {
    const formData = new FormData();
    formData.append("Name", biere.name);
    formData.append("Degre", biere.degre.toString());
    formData.append("Prix", biere.prix.toString().replace('.', ','));
    formData.append("LogoFile", biere.logoFile);
    formData.append("BrasserieId", biere.brasserieId);

    const response = await API.POSTWITHFILE("Bieres", formData);


    if (response.ok) {
        const reponseBiere = await response.json() as PostBiereResponse;
        return reponseBiere;
    }

    return null;
}