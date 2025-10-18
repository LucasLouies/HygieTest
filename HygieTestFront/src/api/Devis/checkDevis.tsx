import type { LigneDevis } from "../../components/Devis/Devis";
import { API } from "../api";

type CheckDevis = {
    "lignesDevis": CheckDevisLigneDevis[];
    "grossisteId": string;
}

type CheckDevisLigneDevis = {
    "biereId": string;
    "quantite": number;
}

export type ErreurCheckDevis = {
    "message": string
}

export async function checkDevis(ligneDevis: LigneDevis[], idGrossiste: string) {
    var tmpCheckDevis: CheckDevis = {
        lignesDevis: [],
        grossisteId: idGrossiste
    }

    ligneDevis.forEach(ligne => {
        tmpCheckDevis.lignesDevis.push({ biereId: ligne.biere.id, quantite: ligne.quantite })
    });

    const response = await API.POST("Devis", tmpCheckDevis);

    if (response.ok) {
        return true;
    } else {
        const messageErreur = await response.json() as ErreurCheckDevis;
        return messageErreur;
    }
}