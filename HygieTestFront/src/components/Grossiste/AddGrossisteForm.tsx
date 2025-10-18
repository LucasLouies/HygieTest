import { useState } from "react";
import { CustomButton } from "../ui/CustomButton";
import { CustomInput } from "../ui/CustomInput";
import { postGrossiste, type PostGrossiste } from "../../api/Grossistes/postGrossiste";
import type { Grossiste } from "../../api/Grossistes/getAllGrossistes";
//import { postGrossiste, type PostGrossiste } from "../../api/Grossistes/postGrossiste";

type AddGrossisteError = "NoError" | "champVide" | "ApiError"

type AddGrossisteFormProps = {
    ajouterGrossiste: (grossiste: Grossiste) => void
}

export function AddGrossisteForm({ ajouterGrossiste }: AddGrossisteFormProps) {
    const [nomGrossiste, setNomGrossiste] = useState("");
    const [error, setError] = useState<AddGrossisteError>("NoError");
    const [isloading, setIsLoading] = useState(false);

    const envoyerGrossiste = async () => {
        setError("NoError")
        if (isloading) {
            return;
        }

        if (nomGrossiste == "") {
            setError("champVide");
            return;
        }

        setIsLoading(true)
        const tmpGrossiste: PostGrossiste = {
            Name: nomGrossiste,
        }
        const result = await postGrossiste(tmpGrossiste);

        if (result == null) {
            setError("ApiError");
        } else {
            setIsLoading(false);
            ajouterGrossiste(result);
        }

    }

    return <>
        <div>
            <div className="flex items-center justify-center min-h-2/3 p-9">
                <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full max-w-2/6 flex flex-col items-center space-y-4 text-center">
                    <h1 className="font-bold text-xl">Ajout de Grossiste</h1>

                    <CustomInput text={nomGrossiste} setText={setNomGrossiste} placeholder="Nom" className="w-full" label="Nom :" />

                    {error == "ApiError" && <p className="text-red-600 font-semibold">ERREUR LORS DE L'ENVOI DES DONNÉES</p>}
                    {error == "champVide" && <p className="text-red-600 font-semibold">UN OU PLUSIEURS CHAMPS SONT VIDES</p>}

                    {isloading ? <p className="text-gray-600 italic">Envoi en cours...</p>
                        : <CustomButton label="Envoyer" action={envoyerGrossiste} />}
                </div>
            </div>
        </div>
    </>
}