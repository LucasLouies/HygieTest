import { getAllBieres, type Biere, } from "../../api/Bieres/getAllBieres";
import { Header } from "../Header";
import { useLayoutEffect, useState } from "react";
import { EtiquetteBiere } from "../ui/EtiquetteBiere";

export function Acceuil() {
    const [bieres, setBieres] = useState<Biere[] | null>(null);
    const [error, setError] = useState(false);

    useLayoutEffect(() => {
        const initBieres = async () => {
            const tmpBieres = await getAllBieres();
            if (tmpBieres == null) {
                setError(true);
            } else {
                setBieres(tmpBieres)
                console.log(tmpBieres);
            }
        }

        initBieres()
    }, [])

    return <>
        <Header />
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
                bieres != null && <>
                    {
                        bieres.map((biere) => {
                            return <EtiquetteBiere biere={biere} key={biere.id} />
                        })
                    }
                </>
            }
        </div>
    </>
}