import { useLayoutEffect, useState } from "react";
import { CustomButton } from "../ui/CustomButton";
import { getAllBieres, type Biere } from "../../api/Bieres/getAllBieres";
import { CustomInput } from "../ui/CustomInput";
import { postStock, type PostStock } from "../../api/Stock/postStock";
import type { Stock } from "../../api/Stock/getStockFromGrossiste";
//import { CustomInput } from "../ui/CustomInput";
//import { postStock, type PostStock } from "../../api/Stocks/postStock";

type AddStockError = "NoError" | "champVide" | "ApiError" | "ImageVide" | "DonneeIncorrecte"

export type AddStockFormProps = {
    idGrossiste: string,
    ajouterStock: (stock: Stock) => void
}

export function AddStockForm({ idGrossiste, ajouterStock }: AddStockFormProps) {
    const [error, setError] = useState<AddStockError>("NoError");
    const [isloading, setIsLoading] = useState(false);
    const [bieres, setBieres] = useState<Biere[] | null>(null);
    const [selectedBiere, setSelectedBiere] = useState<Biere | null>(null);
    const [quantite, setQuantite] = useState("");

    useLayoutEffect(() => {
        const initBieres = async () => {
            const tmpBieres = await getAllBieres();

            if (tmpBieres != null) {
                setBieres(tmpBieres);
            }
        }

        initBieres()
    }, [])

    const envoyerStock = async () => {
        setError("NoError")
        if (isloading) {
            return;
        }

        if (selectedBiere == null) {
            setError("champVide")
            return;
        }
        const quantiteStock = Number(quantite)

        if (isNaN(quantiteStock)) {
            setError("DonneeIncorrecte");
            return;
        }

        setIsLoading(true)
        const tmpStock: PostStock = {
            biereId: selectedBiere.id,
            grossisteId: idGrossiste,
            quantite: quantiteStock
        }
        const result = await postStock(tmpStock);

        if (result == null) {
            setError("ApiError");
        } else {
            ajouterStock(result)
            setIsLoading(false);
        }

    }

    return <>
        <div>
            <div className="flex items-center justify-center min-h-2/3 p-9">
                <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full max-w-2/6 flex flex-col items-center space-y-4 text-center">
                    <h1 className="font-bold text-xl">Ajout de Stock</h1>

                    {
                        bieres && bieres.length > 0 && (
                            <div className="w-full">
                                <label>
                                    Biere :
                                    <select
                                        value={selectedBiere?.id || ""}
                                        onChange={(e) => {
                                            const selected = bieres.find(b => b.id === e.target.value);
                                            setSelectedBiere(selected!);
                                        }}
                                    >
                                        <option value="">-- Choisir une Biere --</option>
                                        {bieres.map((biere) => (
                                            <option key={biere.id} value={biere.id}>
                                                {biere.name}
                                            </option>
                                        ))}
                                    </select>
                                </label>
                            </div>)
                    }

                    <CustomInput label="Quantité" type="number" placeholder="Choisis une quantite" text={quantite} setText={setQuantite} />


                    {error == "ApiError" && <p className="text-red-600 font-semibold">ERREUR LORS DE L'ENVOI DES DONNÉES</p>}
                    {error == "champVide" && <p className="text-red-600 font-semibold">UN OU PLUSIEURS CHAMPS SONT VIDES</p>}
                    {error == "ImageVide" && <p className="text-red-600 font-semibold">IMAGE NON FOURNIE OU AU MAUVAIS FORMAT</p>}

                    {isloading ? <p className="text-gray-600 italic">Envoi en cours...</p>
                        : <CustomButton label="Envoyer" action={envoyerStock} />}
                </div>
            </div>
        </div>
    </>
}