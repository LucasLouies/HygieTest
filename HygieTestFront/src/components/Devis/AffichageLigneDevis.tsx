import { CustomText } from "../ui/CustomText"
import type { LigneDevis } from "./Devis"

type AffichageLigneDevisProps = {
    ligneDevis: LigneDevis
}

export function AffichageLigneDevis({ ligneDevis }: AffichageLigneDevisProps) {
    return <div className="w-screen flex justify-center p-2">
        <div className="w-3/4 bg-gray-300 flex border border-black rounded-b-md overflow-hidden shadow-md text-center">
            <CustomText text={ligneDevis.biere.name} className="flex-1" />
            <CustomText text={ligneDevis.quantite + "/pcs"} className="flex-1" />
            <CustomText text={"sous-total : " + ligneDevis.quantite * ligneDevis.biere.prix + "€"} className="flex-1" />
        </div>
    </div>
}