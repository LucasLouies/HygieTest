import { getAllBieres, type Biere, } from "../../api/Bieres/getAllBieres";
import { Header } from "../Header";
import { useEffect, useLayoutEffect, useState } from "react";
import { EtiquetteBiere } from "../ui/EtiquetteBiere";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getAllBrasseries, type Brasserie } from "../../api/Brasseries/getAllBrasseries";
import { getAllBiereFromGrossisteId } from "../../api/Bieres/getAllBiereFromGrossisteId";
import { CustomInput } from "../ui/CustomInput";
import { CustomSelect } from "../ui/CustomSelect";

/**
 * la page d'accueil
 */

export function Accueil() {
    const [bieres, setBieres] = useState<Biere[] | null>(null);
    const [displayedBieres, setDisplayedBieres] = useState<Biere[] | null>(null);
    const [error, setError] = useState(false);
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null);
    const [brasseries, setBrasseries] = useState<Brasserie[] | null>(null);
    const [selectedGrossiste, setSelectedGrossiste] = useState<Grossiste | null>(null);
    const [selectedBrasserie, setSelectedBrasserie] = useState<Brasserie | null>(null);
    const [recherche, setRecherche] = useState("");

    useLayoutEffect(() => {
        const initBieres = async () => {
            const tmpBieres = await getAllBieres();
            if (tmpBieres == null) {
                setError(true);
            } else {
                setBieres(tmpBieres);
                setDisplayedBieres(tmpBieres);
            }
        }

        const initBrasseries = async () => {
            const tmpBrasseries = await getAllBrasseries();
            if (tmpBrasseries == null) {
                setError(true);
            } else {
                setBrasseries(tmpBrasseries)
            }
        }


        const initGrossistes = async () => {
            const tmpGrossistes = await getAllGrossistes();
            if (tmpGrossistes == null) {
                setError(true);
            } else {
                setGrossistes(tmpGrossistes)
            }
        }

        initGrossistes();
        initBrasseries();
        initBieres();
    }, [])

    useEffect(() => {
        const filterBieres = async () => {
            if (!bieres) return;

            let filtered = [...bieres];

            if (selectedBrasserie) {
                filtered = filtered.filter(b => b.brasseriesId === selectedBrasserie.id);
            }

            if (selectedGrossiste) {
                const tmpBiereGrossiste = await getAllBiereFromGrossisteId(selectedGrossiste.id);
                if (tmpBiereGrossiste) {
                    const ids = tmpBiereGrossiste.map(b => b.id);
                    filtered = filtered.filter(b => ids.includes(b.id));
                }
            }

            if (recherche.trim() !== "") {
                filtered = filtered.filter(b =>
                    b.name.toLowerCase().includes(recherche.toLowerCase())
                );
            }

            setDisplayedBieres(filtered);
        };

        filterBieres();
    }, [selectedBrasserie, selectedGrossiste, recherche, bieres]);


    return <>
        <Header />
        <div className="flex justify-center w-full">
            <div className="w-3/4">
                <CustomInput placeholder="Recherche" setText={setRecherche} text={recherche} className="w-full" />
            </div>
        </div>
        <div className="flex-row flex w-full px-5">
            <div className="flex-1 px-5">
                {
                    brasseries && brasseries.length > 0 &&
                    <CustomSelect
                        label="-- Choisir une brasserie --"
                        selectedElement={selectedBrasserie}
                        table={brasseries}
                        setSelectedElement={(brasserie: Brasserie) => setSelectedBrasserie(brasserie)}

                    />
                }
            </div>
            <div className="flex-1 px-5">
                {
                    grossistes && grossistes.length > 0 &&
                    <CustomSelect
                        label="-- Choisir un grossiste --"
                        selectedElement={selectedGrossiste}
                        table={grossistes}
                        setSelectedElement={(grossiste: Grossiste) => setSelectedGrossiste(grossiste)} />
                }
            </div>
        </div>
        <div>
            {
                error && <p>ERREUR LORS DU CHARGEMENT DE DONNEES</p>
            }
        </div>
        <div>
            {
                bieres?.length == 0 && <p>AUCUNE BIERE ENREGISTREE</p>
            }
        </div>
        <div className="grid grid-cols-5 gap-2 p-6">
            {
                displayedBieres != null && <>
                    {
                        displayedBieres.map((biere) => {
                            return <EtiquetteBiere biere={biere} key={biere.id} />
                        })
                    }
                </>
            }
        </div>
    </>
}