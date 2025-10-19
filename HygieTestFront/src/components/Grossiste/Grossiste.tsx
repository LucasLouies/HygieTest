import { useLayoutEffect, useState } from "react";
import { Header } from "../Header";
import { CustomButton } from "../ui/CustomButton";
import { AddGrossisteForm } from "./AddGrossisteForm";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { CustomText } from "../ui/CustomText";

/**
 * page qui permet la gestion des grossistes
 */

export function Grossiste() {
    const [openGrossisteForm, setOpenGrossisteForm] = useState(false);
    const [error, setError] = useState(false);
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null)

    useLayoutEffect(() => {
        const initGrossistes = async () => {
            const tmpGrossistes = await getAllGrossistes();
            if (tmpGrossistes == null) {
                setError(true);
            } else {
                setGrossistes(tmpGrossistes)
            }
        }

        initGrossistes()
    }, [])

    function ajouterGrossiste(grossiste: Grossiste) {
        if (grossistes != null)
            setGrossistes([...grossistes, grossiste])
    }

    return <>
        <Header />
        <div className=" bg-gray-50 h-screen mt-2">
            <CustomText text="Liste des grossistes" className="text-center" title={true} size={4} />
            {error && <CustomText text="ERREUR LORS DU CHARGEMENT DE DONNEES" />}
            {
                grossistes && grossistes?.length == 0 && <CustomText text="pas de grossiste enregistré" />
            }
            {
                grossistes && grossistes.length > 0 && grossistes.map((grossiste) => {
                    return <CustomText key={grossiste.id} text={grossiste.name} className="text-center mt-2" size={2} />
                })
            }
            <CustomButton label="Ajouter Grossiste" action={() => setOpenGrossisteForm(!openGrossisteForm)} />
            {openGrossisteForm && <AddGrossisteForm ajouterGrossiste={ajouterGrossiste} />}
        </div>
    </>
}