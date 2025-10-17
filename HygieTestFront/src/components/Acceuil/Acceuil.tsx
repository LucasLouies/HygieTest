import { getAllBieres, type Biere, } from "../../api/Bieres/getAllBieres";
import { Header } from "../Header";
import { useEffect, useLayoutEffect, useState } from "react";
import { EtiquetteBiere } from "../ui/EtiquetteBiere";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getAllBrasseries, type Brasserie } from "../../api/Brasseries/getAllBrasseries";
import { getAllBiereFromGrossisteId } from "../../api/Bieres/getAllBiereFromGrossisteId";
import { getAllBieresFromBrasserieId } from "../../api/Bieres/getAllBieresFromBrasserieId";

export function Acceuil() {
    const [bieres, setBieres] = useState<Biere[] | null>(null);
    const [displayedBieres, setDisplayedBieres] = useState<Biere[] | null>(null);
    const [error, setError] = useState(false);
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null);
    const [brasseries, setBrasseries] = useState<Brasserie[] | null>(null);
    const [selectedGrossiste, setSelectedGrossiste] = useState<Grossiste | null>(null);
    const [selectedBrasserie, setSelectedBrasserie] = useState<Brasserie | null>(null);

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
        setError(false);
        const filterBiere = async () => {
            if (selectedBrasserie == null && selectedGrossiste == null && bieres != null) {
                setDisplayedBieres([...bieres])
                return;
            } else {
                if (selectedBrasserie && selectedGrossiste) {
                    const tmpBiereBrasserie: Biere[] | null = await getAllBieresFromBrasserieId(selectedBrasserie.id);
                    const tmpBiereGrossiste: Biere[] | null = await getAllBiereFromGrossisteId(selectedGrossiste.id);

                    const tmpBieresDisplay: Biere[] = [];
                    if (tmpBiereBrasserie && tmpBiereGrossiste) {
                        tmpBiereBrasserie.forEach(biereBrasserie => {
                            tmpBiereGrossiste.forEach(biereGrossiste => {
                                if (biereBrasserie.id == biereGrossiste.id) {
                                    tmpBieresDisplay.push(biereBrasserie);
                                }
                            });
                        });
                        setDisplayedBieres(tmpBieresDisplay);
                    } else {
                        setError(true)
                    }
                } else if (selectedBrasserie) {
                    const tmpBiere: Biere[] | null = await getAllBieresFromBrasserieId(selectedBrasserie.id);
                    if (tmpBiere == null) {
                        setError(true);
                    } else {
                        setDisplayedBieres(tmpBiere);
                    }
                } else if (selectedGrossiste) {
                    const tmpBiere: Biere[] | null = await getAllBiereFromGrossisteId(selectedGrossiste.id);
                    if (tmpBiere == null) {
                        setError(true);
                    } else {
                        setDisplayedBieres(tmpBiere);
                    }
                }
            }

        }
        filterBiere();

    }, [selectedBrasserie, selectedGrossiste])

    return <>
        <Header />
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