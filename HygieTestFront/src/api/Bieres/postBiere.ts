import { API } from "../api"
import type { Biere } from "./getAllBieres"

export type PostBiere = {
    "name": string,
    "degre": number,
    "prix": number,
    "logoFile": File
}

export type PostBiereResponse = {
    biereAjoute: Biere
}

export async function postBiere(biere: PostBiere) {
    const formData = new FormData();
    formData.append("Name", biere.name);
    formData.append("Degre", biere.degre.toString());
    formData.append("Prix", biere.prix.toString());
    formData.append("LogoFile", biere.logoFile);

    console.log(formData);

    const response = await API.POSTWITHFILE("Bieres", formData);


    if (response.ok) {
        const reponseBiere = await response.json() as PostBiereResponse;
        return reponseBiere;
    }

    return null;
}