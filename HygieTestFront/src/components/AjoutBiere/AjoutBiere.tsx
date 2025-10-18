import { useLayoutEffect, useState } from "react";
import { CustomInput } from "../ui/CustomInput"
import { Header } from "../Header";
import { CustomButton } from "../ui/CustomButton";
import { postBiere, type PostBiere } from "../../api/Bieres/postBiere";
import { CustomFileUploader } from "../ui/CustomFileUploader";
import { getAllBrasseries, type Brasserie } from "../../api/Brasseries/getAllBrasseries";
import { CustomText } from "../ui/CustomText";

type AjoutBiereError = "NoError" | "champVide" | "ApiError" | "DonneeIncorrecte" | "ImageVide";

export function AjoutBiere() {
    const [nomBiere, setNomBiere] = useState("");
    const [degre, setDegre] = useState("");
    const [prix, setPrix] = useState("");
    const [logo, setLogo] = useState<File | null>(null)
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState<AjoutBiereError>("NoError");
    const [brasseries, setBrasseries] = useState<Brasserie[] | null>(null);
    const [selectedBrasserie, setSelectedBrasserie] = useState<Brasserie | null>(null);
    const [ajoutReussi, setAjoutReussi] = useState(false);



    useLayoutEffect(() => {
        const initBrasseries = async () => {
            const tmpBrasseries = await getAllBrasseries();
            if (tmpBrasseries == null) {
                setError("ApiError");
            } else {
                setBrasseries(tmpBrasseries)
                if (tmpBrasseries.length > 0)
                    setSelectedBrasserie(tmpBrasseries[0])
            }
        }

        initBrasseries()
    }, [])


    const envoyerBiere = async () => {
        setAjoutReussi(false)
        setError("NoError")
        if (isloading) {
            return;
        }

        if (prix == "" || degre == "" || nomBiere == "") {
            setError("champVide");
            return;
        }

        if (logo == null || selectedBrasserie == null) {
            setError("ImageVide");
            return;
        }

        const degreNum = Number(degre);
        const prixNum = Number(prix);
        console.log(prixNum);


        if (isNaN(degreNum) || isNaN(prixNum)) {
            setError("DonneeIncorrecte");
            return;
        }

        setIsLoading(true)
        const tmpBiere: PostBiere = {
            name: nomBiere,
            degre: degreNum,
            prix: prixNum,
            logoFile: logo,
            brasserieId: selectedBrasserie.id
        }
        const result = postBiere(tmpBiere);

        if (result == null) {
            setError("ApiError");
        }

        setIsLoading(false);
        setAjoutReussi(true);
    }

    return <>
        <Header />
        <div className=" bg-gray-50 h-screen">
            {
                brasseries && brasseries.length == 0 && <CustomText text="Veuillez ajouter une brasserie avant d'ajouter une biere !" />
            }
            {
                brasseries && brasseries.length > 0 &&
                <div className="flex items-center justify-center min-h-2/3 p-9">
                    <div className="border border-gray-300 rounded-xl p-6 shadow-md bg-white w-full max-w-2/6 flex flex-col items-center space-y-4 text-center">
                        <h1 className="font-bold text-xl">Ajout de Bière</h1>

                        <CustomInput text={nomBiere} setText={setNomBiere} placeholder="Nom" className="w-full" label="Nom :" />
                        <CustomInput text={degre} setText={setDegre} placeholder="Degré" className="w-full" type="number" label="Degré :" />
                        <CustomInput text={prix} setText={setPrix} placeholder="Prix" className="w-full" type="number" label="Prix :" />
                        {brasseries && brasseries.length > 0 && (
                            <label>
                                Brasserie :
                                <select
                                    value={selectedBrasserie?.id || ""}
                                    onChange={(e) => {
                                        const selected = brasseries.find(b => b.id === e.target.value);
                                        setSelectedBrasserie(selected!);
                                        console.log("Selected:", selected?.name);
                                    }}
                                >
                                    <option value="">-- Choisir une brasserie --</option>
                                    {brasseries.map((brasserie) => (
                                        <option key={brasserie.id} value={brasserie.id}>
                                            {brasserie.name}
                                        </option>
                                    ))}
                                </select>
                            </label>

                        )}
                        <CustomFileUploader label="logo :" setFile={setLogo} />

                        {error == "ApiError" && <p className="text-red-600 font-semibold">ERREUR LORS DE L'ENVOI DES DONNÉES</p>}
                        {error == "champVide" && <p className="text-red-600 font-semibold">UN OU PLUSIEURS CHAMPS SONT VIDES</p>}
                        {error == "DonneeIncorrecte" && <p className="text-red-600 font-semibold">FORMAT DE DONNEE INCORRECTE</p>}
                        {error == "ImageVide" && <p className="text-red-600 font-semibold">IMAGE NON FOURNIE OU AU MAUVAIS FORMAT</p>}

                        {isloading ? <p className="text-gray-600 italic">Envoi en cours...</p>
                            : <CustomButton label="Envoyer" action={envoyerBiere} />}
                        {ajoutReussi && <CustomText text="BIERE ENVOYE AVEC SUCCES !" className="text-green-900" />}
                    </div>
                </div>
            }
        </div>
    </>
}