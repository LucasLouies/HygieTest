import { useLayoutEffect, useState } from "react";
import { Header } from "../Header";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getStockFromGrossiste, type Stock } from "../../api/Stock/getStockFromGrossiste";
import { CustomText } from "../ui/CustomText";
import { FormDevis } from "./FormDevis";
import type { Biere } from "../../api/Bieres/getAllBieres";
import { AffichageLigneDevis } from "./AffichageLigneDevis";

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

    const addLigneDevis = (ligneDevis: LigneDevis) => {
        setDevis((prev) => [...prev, ligneDevis]);
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
            selectedGrossiste && stock && stock.length == 0 && <CustomText text="CE GROSSISTE NE PROPOSE PAS DE BIERES POUR LE MOMENT !" />
        }
        {
            selectedGrossiste && stock && stock.length > 0 && <FormDevis stock={stock} addLigneDevis={addLigneDevis} />
        }
    </>
}