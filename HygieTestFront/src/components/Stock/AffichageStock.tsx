import { useLayoutEffect, useState } from "react";
import type { Stock } from "../../api/Stock/getStockFromGrossiste"
import { getBiereFromId } from "../../api/Bieres/getBiereFromId";
import type { Biere } from "../../api/Bieres/getAllBieres";
import type { Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { CustomText } from "../ui/CustomText";

export type AffichageStockProps = {
    stock: Stock[],
    grossiste: Grossiste
}

export function AffichageStock({ stock, grossiste }: AffichageStockProps) {

    return <>
        {
            stock.map((ligne) => {
                return <AffichageLigneStock key={ligne.grosssistesId + "_" + ligne.bieresId} biereId={ligne.bieresId} grossiste={grossiste} quantite={ligne.quantite} />
            })
        }
    </>
}

type AffichageLigneStockProps = {
    biereId: string,
    grossiste: Grossiste,
    quantite: number
}

type ErrorLigneStock = "NoError" | "ApiErrorBiere" | "ApiErrorGrossiste";

function AffichageLigneStock({ biereId, grossiste, quantite }: AffichageLigneStockProps) {
    const [error, setError] = useState<ErrorLigneStock>("NoError")
    const [biere, setBiere] = useState<Biere | null>(null)

    useLayoutEffect(() => {

        const initBiere = async () => {
            const tmpBiere = await getBiereFromId(biereId);
            if (tmpBiere == null) {
                setError("ApiErrorBiere");
                return;
            }
            console.log(tmpBiere);

            setBiere(tmpBiere)
        }
        initBiere();
    }, [])


    return <>
        {
            biere &&
            <div className="w-screen flex justify-center p-2">
                <div className="w-3/4 bg-gray-300 flex border border-black rounded-b-md overflow-hidden shadow-md">
                    <div className="flex-1 text-center">
                        <CustomText text={biere.name} />
                    </div>
                    <div className="flex-1 text-center">
                        <CustomText text={biere.prix + "€"} />
                    </div>
                    <div className="flex-1 text-center">
                        <CustomText text={quantite + "pcs"} />
                    </div>
                </div>
            </div>
        }
    </>
}