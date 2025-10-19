import { API } from "../api"
import type { Grossiste } from "./getAllGrossistes"

export type PostGrossiste = {
    "Name": string
}

/**
 * @param grossiste le grossiste à insérer en db
 * @returns le grossiste inséré en db ou null en cas d'échec
 */

export async function postGrossiste(grossiste: PostGrossiste) {
    const response = await API.POST("Grossistes", grossiste);
    if (response.ok) {
        const reponseGrossiste = await response.json() as Grossiste;
        return reponseGrossiste;
    }

    return null;
}