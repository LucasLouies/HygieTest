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

/**
 * le formulaire qui permet d'ajouter une ligne au devis en cours
 * @param stock le tableau représentant le stock d'un grossiste
 * @param addLigneDevis la méthode qui permet d'ajouter un ligne au devis
 */

export function FormDevis({ stock, addLigneDevis }: FormDevisProps) {
    const [quantite, setQuantite] = useState("");
    const [mapBieres, setMapBieres] = useState<Map<string, Biere> | null>(null);
    const [selectedBiere, setSelectedBiere] = useState<Biere | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    return <div className="items-center flex justify-center min-h-2/3 p-9 min-w-250 w-full">
        <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full max-w-7/12 flex flex-col items-center space-y-4 text-center">
            <div className="flex-1 w-full">
                <CustomText text="SELECTION DE BIERE" size={3} title />
            </div>
            <div className="flex-2 w-full flex justify-center items-center">
                {
                    !isLoading &&
                    <div className="flex-row flex items-center justify-center gap-4 w-full full">
                        <div className="flex-1 flex items-center justify-center">
                            {
                                mapBieres && stock &&
                                <select
                                    className="
                                    w-full
                                    rounded-xl
                                    border border-gray-300
                                    py-2
                                    text-center
                                    shadow-sm
                                    focus:outline-none
                                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                                    transition-all duration-200
                                    hover:border-blue-400
                                    cursor-pointer"
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
                        <div className="flex-1 text-center w-full">
                            {
                                selectedBiere && <CustomText text={selectedBiere.prix + "€"} />
                            }

                        </div>
                    </div>
                }

            </div>
            <div className="flex-1 w-full">
                <CustomButton action={checkAddLigneDevis} label="Ajouter au devis" />
            </div>
        </div>
    </div>
}