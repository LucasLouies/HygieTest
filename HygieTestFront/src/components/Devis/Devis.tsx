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

type Error = "NoError" | "ErrorApi";

export type LigneDevis = {
    biere: Biere,
    quantite: number,
}

export function Devis() {
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null);
    const [selectedGrossiste, setSelectedGrossiste] = useState<Grossiste | null>(null);
    const [devis, setDevis] = useState<LigneDevis[]>([]);
    const [stock, setStock] = useState<Stock[] | null>(null);
    const [error, setError] = useState<Error>("NoError");
    const [messageErreur, setMessageErreur] = useState<ErreurCheckDevis | null>(null);

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
        const initStock = async () => {
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

        }
        initStock();
    }, [selectedGrossiste])

    function getTotal() {
        var total = 0;
        devis.forEach(ligneDevis => {
            total += ligneDevis.quantite * ligneDevis.biere.prix
        });

        return total;
    }

    async function verifDevis() {
        if (selectedGrossiste) {
            const result = await checkDevis(devis, selectedGrossiste.id);
            if (result == true) {
                setMessageErreur(null)
            } else {
                setMessageErreur(result);
            }
        }
    }

    return <>
        <Header />
        {
            grossistes && grossistes.length > 0 && (
                <div className="w-full">
                    <select
                        value={selectedGrossiste?.id || ""}
                        onChange={(e) => {
                            const selected = grossistes.find(b => b.id === e.target.value);
                            setSelectedGrossiste(selected!);
                        }}
                    >
                        <option value="">-- Choisir un grossiste --</option>
                        {grossistes.map((grossiste) => (
                            <option key={grossiste.id} value={grossiste.id}>
                                {grossiste.name}
                            </option>
                        ))}
                    </select>
                </div>)
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
            messageErreur && <CustomText text={messageErreur.message} />
        }
        {
            <CustomButton action={verifDevis} label="Envoyer le Devis" />
        }
        {
            selectedGrossiste && stock && stock.length == 0 && <CustomText text="CE GROSSISTE NE PROPOSE PAS DE BIERES POUR LE MOMENT !" />
        }
        {
            selectedGrossiste && stock && stock.length > 0 && <FormDevis stock={stock} addLigneDevis={addLigneDevis} />
        }
    </>
}