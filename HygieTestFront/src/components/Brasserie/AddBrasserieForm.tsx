import { useState } from "react";
import { CustomButton } from "../ui/CustomButton";
import { CustomFileUploader } from "../ui/CustomFileUploader";
import { CustomInput } from "../ui/CustomInput";
import { postBrasserie, type PostBrasserie } from "../../api/Brasseries/postBrasserie";

type AddBrasserieError = "NoError" | "champVide" | "ApiError" | "ImageVide"

export function AddBrasserieForm() {
    const [nomBrasserie, setNomBrasserie] = useState("");
    const [logo, setLogo] = useState<File | null>(null)
    const [error, setError] = useState<AddBrasserieError>("NoError");
    const [isloading, setIsLoading] = useState(false);

    const envoyerBrasserie = async () => {
        setError("NoError")
        if (isloading) {
            return;
        }

        if (nomBrasserie == "") {
            setError("champVide");
            return;
        }

        if (logo == null) {
            setError("ImageVide")
            return;
        }

        setIsLoading(true)
        const tmpBrasserie: PostBrasserie = {
            name: nomBrasserie,
            logoFile: logo
        }
        const result = postBrasserie(tmpBrasserie);

        if (result == null) {
            setError("ApiError");
        }

        setIsLoading(false);
    }

    return <>
        <div>
            <div className="flex items-center justify-center min-h-2/3 p-9">
                <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full max-w-2/6 flex flex-col items-center space-y-4 text-center">
                    <h1 className="font-bold text-xl">Ajout de Brasserie</h1>

                    <CustomInput text={nomBrasserie} setText={setNomBrasserie} placeholder="Nom" className="w-full" label="Nom :" />
                    <CustomFileUploader label="logo :" setFile={setLogo} />

                    {error == "ApiError" && <p className="text-red-600 font-semibold">ERREUR LORS DE L'ENVOI DES DONNÉES</p>}
                    {error == "champVide" && <p className="text-red-600 font-semibold">UN OU PLUSIEURS CHAMPS SONT VIDES</p>}
                    {error == "ImageVide" && <p className="text-red-600 font-semibold">IMAGE NON FOURNIE OU AU MAUVAIS FORMAT</p>}

                    {isloading ? <p className="text-gray-600 italic">Envoi en cours...</p>
                        : <CustomButton label="Envoyer" action={envoyerBrasserie} />}
                </div>
            </div>
        </div>
    </>
}