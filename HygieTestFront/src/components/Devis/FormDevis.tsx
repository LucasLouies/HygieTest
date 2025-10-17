import { useLayoutEffect, useState } from "react";
import { CustomInput } from "../ui/CustomInput";
import { CustomText } from "../ui/CustomText";
import { CustomButton } from "../ui/CustomButton";
import type { Stock } from "../../api/Stock/getStockFromGrossiste";
import type { LigneDevis } from "./Devis";
import type { Biere } from "../../api/Bieres/getAllBieres";
import { getBiereFromId } from "../../api/Bieres/getBiereFromId";

export type FormDevisProps = {
    stock: Stock[],
    addLigneDevis: (ligneDevis: LigneDevis) => void
}

export function FormDevis({ stock, addLigneDevis }: FormDevisProps) {
    const [quantite, setQuantite] = useState("");
    const [mapBieres, setMapBieres] = useState<Map<string, Biere> | null>(null);
    const [selectedBiere, setSelectedBiere] = useState<Biere | null>(null);

    const checkAddLigneDevis = () => {
        if (selectedBiere == null)
            return;

        if (quantite == "")
            return;

        const quantBiere = Number(quantite)

        if (isNaN(quantBiere)) {
            //setError("DonneeIncorrecte");
            return;
        }

        addLigneDevis({ biere: selectedBiere, quantite: quantBiere });

    }

    useLayoutEffect(() => {
        const initBieres = async () => {
            var tmpMapBieres: Map<string, Biere> = new Map<string, Biere>()
            stock.forEach(async ligneStock => {
                const tmpBiere = await getBiereFromId(ligneStock.bieresId);
                if (tmpBiere != null) {
                    tmpMapBieres.set(tmpBiere.id, tmpBiere);
                }
                setMapBieres(tmpMapBieres);

            });
        }
        initBieres();
    }, [])

    return <div className="items-center justify-center min-h-2/3 p-9 min-w-250">
        <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full max-w-3/4 flex flex-col items-center space-y-4 text-center">
            <div className="flex-1 w-full">
                <CustomText text="SELECTION DE BIERE" size={3} title />
            </div>
            <div className="flex-2 w-full justify-center items-center">
                <div className="flex-row flex items-center justify-center gap-4 w-full max-w-3xl">
                    <div className="flex-1 text-center">
                        {
                            mapBieres && stock &&
                            <select
                                value={selectedBiere?.id || ""}
                                onChange={(e) => {
                                    const selected = mapBieres!.get(e.target.value)
                                    setSelectedBiere(selected!);
                                }}
                            >
                                <option value="">-- Choisir une biere --</option>
                                {
                                    mapBieres.size > 0 &&
                                    stock.map((ligneStock) => (
                                        <option key={ligneStock.bieresId} value={ligneStock.bieresId}>
                                            {mapBieres.get(ligneStock.bieresId)?.name}
                                        </option>
                                    ))
                                }
                            </select>
                        }
                    </div>
                    {
                        selectedBiere &&
                        <div className="flex-1 flex flex-row justify-center items-center text-center">
                            <CustomInput label="Quantité : " setText={setQuantite} text={quantite} placeholder="Quantite" type="number" labelAndInputClose className="flex-1" />
                            <CustomText text={"/" + stock.filter((s) => s.bieresId == selectedBiere!.id)[0].quantite} className="flex-1" size={3} />
                        </div>
                    }
                    <div className="flex-1 text-center">
                        {
                            selectedBiere && <CustomText text={selectedBiere.prix + "€"} />
                        }

                    </div>
                </div>
            </div>
            <div className="flex-1 w-full">
                <CustomButton action={checkAddLigneDevis} label="Envoyer" />
            </div>
        </div>
    </div>
}