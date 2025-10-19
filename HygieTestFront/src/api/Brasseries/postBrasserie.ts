import { API } from "../api"
import type { Brasserie } from "./getAllBrasseries"

export type PostBrasserie = {
    "name": string,
    "logoFile": File
}

/**
 * 
 * @param brasserie la brasserie à insérer en db
 * @returns la brasserie qui a été insérée en db ou null en cas d'échec
 */

export async function postBrasserie(brasserie: PostBrasserie) {
    const formData = new FormData();
    formData.append("Name", brasserie.name);
    formData.append("LogoFile", brasserie.logoFile);

    const response = await API.POSTWITHFILE("Brasseries", formData);

    if (response.ok) {
        const responseBrasserie = await response.json() as Brasserie;
        return responseBrasserie;
    }

    return null
}