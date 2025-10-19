import { useLayoutEffect, useState } from "react";
import { Header } from "../Header";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getStockFromGrossiste, type Stock } from "../../api/Stock/getStockFromGrossiste";
import { CustomText } from "../ui/CustomText";
import { FormDevis } from "./FormDevis";
import type { Biere } from "../../api/Bieres/getAllBieres";
import { AffichageLigneDevis } from "./AffichageLigneDevis";
import { CustomButton } from "../ui/CustomButton";
import { checkDevis, type ErreurCheckDevis } from "../../api/Devis/checkDevis";
import { CustomSelect } from "../ui/CustomSelect";

type Error = "NoError" | "ErrorApi";

export type LigneDevis = {
    biere: Biere,
    quantite: number,
}

/**
 * page de gestion de devis
 */

export function Devis() {
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null);
    const [selectedGrossiste, setSelectedGrossiste] = useState<Grossiste | null>(null);
    const [devis, setDevis] = useState<LigneDevis[]>([]);
    const [stock, setStock] = useState<Stock[] | null>(null);
    const [error, setError] = useState<Error>("NoError");
    const [messageErreur, setMessageErreur] = useState<ErreurCheckDevis | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const addLigneDevis = (ligneDevis: LigneDevis) => {
        var tmpDevis = [...devis];
        var ajoute = false;
        tmpDevis.forEach(ligne => {
            if (!ajoute && ligne.biere.brasseriesId == ligneDevis.biere.brasseriesId) {
                ajoute = true;
                ligne.quantite = ligneDevis.quantite;
            }
        });
        if (!ajoute) {
            tmpDevis.push(ligneDevis)
        }
        setDevis(tmpDevis);
    }

    useLayoutEffect(() => {
        setStock(null);
        const initStock = async () => {
            setIsLoading(true);
            if (grossistes == null) {
                const tmpGrossiste = await getAllGrossistes();

                if (tmpGrossiste == null) {
                    setError("ErrorApi")
                }

                setGrossistes(tmpGrossiste);
            } else {
                if (selectedGrossiste != null) {
                    const tmpStock = await getStockFromGrossiste(selectedGrossiste.id);
                    setStock(tmpStock);
                }
            }
            setIsLoading(false);
        }
        initStock();
        setDevis([]);
        setMessageErreur(null);
    }, [selectedGrossiste])

    function getTotal() {
        var nbrBiereDevis = 0;
        var reduction = 0;
        var total = 0;
        devis.forEach(ligneDevis => {
            nbrBiereDevis += ligneDevis.quantite;
            total += ligneDevis.quantite * ligneDevis.biere.prix;
        });

        if (nbrBiereDevis > 9) {
            if (nbrBiereDevis > 19) {
                reduction = Number((total * 0.2).toFixed(2))
            } else {
                reduction = Number((total * 0.1).toFixed(2))
            }
        }
        if (reduction != 0) {
            return total + "€ - " + reduction + "€ (réduction) = " + (total - reduction);
        }

        return total;

    }

    async function verifDevis() {
        if (selectedGrossiste) {
            const result = await checkDevis(devis, selectedGrossiste.id);
            if (result == true) {
                setMessageErreur({ message: "Le devis est valide !" })
            } else {
                setMessageErreur(result);
            }
        }
    }

    return <>
        <Header />
        {
            grossistes && grossistes.length > 0 &&
            <div className="w-full flex items-center justify-center mt-2">
                <div className="w-1/2">
                    <CustomSelect
                        label="-- Choisir un grossiste --"
                        selectedElement={selectedGrossiste}
                        table={grossistes}
                        setSelectedElement={(grossiste: Grossiste) => setSelectedGrossiste(grossiste)} />
                </div>
            </div>

        }
        {
            devis.length > 0 && devis.map((ligneDevis) => {
                return <AffichageLigneDevis ligneDevis={ligneDevis} key={ligneDevis.biere.id} />
            })
        }
        {
            devis.length > 0 &&
            <div className="w-screen flex justify-center p-4">
                <CustomText text={"Total : " + getTotal() + "€"} size={3} />
            </div>
        }
        {
            messageErreur &&
            <div className="w-full text-center">
                <CustomText text={messageErreur.message} />
            </div>
        }
        {
            devis.length > 0 &&
            <div className="flex justify-center w-full">
                <CustomButton action={verifDevis} label="Vérifier le Devis" />
            </div>
        }
        {
            selectedGrossiste && stock && stock.length == 0 && <CustomText text="CE GROSSISTE NE PROPOSE PAS DE BIERES POUR LE MOMENT !" />
        }
        {
            selectedGrossiste && stock && stock.length > 0 && !isLoading && <FormDevis stock={stock} addLigneDevis={addLigneDevis} key={selectedGrossiste.id} />
        }
    </>
}