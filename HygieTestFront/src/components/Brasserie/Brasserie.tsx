import { useLayoutEffect, useState } from "react";
import { Header } from "../Header";
import { getAllBrasseries, type Brasserie } from "../../api/Brasseries/getAllBrasseries";
import { CustomButton } from "../ui/CustomButton";
import { AddBrasserieForm } from "./AddBrasserieForm";
import { AffichageBrasserie } from "./AffichageBrasserie";

export function Brasserie() {
    const [brasseries, setBrasseries] = useState<Brasserie[] | null>(null);
    const [error, setError] = useState(false);
    const [openBrasserieForm, setOpenBrasserieForm] = useState(false);

    useLayoutEffect(() => {
        const initBrasseries = async () => {
            const tmpBrasseries = await getAllBrasseries();
            if (tmpBrasseries == null) {
                setError(true);
            } else {
                setBrasseries(tmpBrasseries)
                console.log(tmpBrasseries);
            }
        }

        initBrasseries()
    }, [])

    function ajouterBrasserie(brasserie: Brasserie) {
        if (brasseries != null)
            setBrasseries([...brasseries, brasserie])
    }

    return <>
        <Header />
        <div className=" bg-gray-50 h-screen">
            <div>
                {
                    error && <p>ERREUR LORS DU CHARGEMENT DE DONNEES</p>
                }
            </div>
            <div>
                {
                    brasseries?.length == 0 && <p>PAS DE BRASSERIES ENREGISTREES</p>
                }
            </div>
            <div>
                {
                    brasseries && brasseries?.length > 0 && brasseries.map((brasserie) => {
                        return <AffichageBrasserie key={brasserie.id} brasserie={brasserie} />
                    })
                }
            </div>
            <CustomButton label="Ajouter Brasserie" action={() => setOpenBrasserieForm(!openBrasserieForm)} />
            <div>
                {
                    openBrasserieForm && <AddBrasserieForm ajouterBrasserie={ajouterBrasserie} />
                }
            </div>

        </div>
    </>
}