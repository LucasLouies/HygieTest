import { getAllBieres, type Biere, } from "../../api/Bieres/getAllBieres";
import { Header } from "../Header";
import { useEffect, useLayoutEffect, useState } from "react";
import { EtiquetteBiere } from "../ui/EtiquetteBiere";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getAllBrasseries, type Brasserie } from "../../api/Brasseries/getAllBrasseries";
import { getAllBiereFromGrossisteId } from "../../api/Bieres/getAllBiereFromGrossisteId";
import { CustomInput } from "../ui/CustomInput";

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
        <CustomInput placeholder="Recherche" setText={setRecherche} text={recherche} className="w-11/12 ml-2 mr-4 center" />
        <div className="flex-row flex w-full">
            <div className="flex-1">
                {
                    brasseries && brasseries.length > 0 && (
                        <div className="w-full">
                            <select
                                value={selectedBrasserie?.id || ""}
                                onChange={(e) => {
                                    const selected = brasseries.find(b => b.id === e.target.value);
                                    setSelectedBrasserie(selected!);
                                }}
                            >
                                <option value="">-- Choisir une brasserie --</option>
                                {brasseries.map((brasserie) => (
                                    <option key={brasserie.id} value={brasserie.id}>
                                        {brasserie.name}
                                    </option>
                                ))}
                            </select>
                        </div>)
                }
            </div>
            <div className="flex-1">
                {
                    grossistes && grossistes.length > 0 && (
                        <div className="w-full">
                            <select
                                value={selectedGrossiste?.id || ""}
                                onChange={(e) => {
                                    const selected = grossistes.find(b => b.id === e.target.value);
                                    setSelectedGrossiste(selected!);
                                }}
                            >
                                <option value="">-- Choisir un grossiste --</option>
                                {grossistes.map((grossiste) => (
                                    <option key={grossiste.id} value={grossiste.id}>
                                        {grossiste.name}
                                    </option>
                                ))}
                            </select>
                        </div>)
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