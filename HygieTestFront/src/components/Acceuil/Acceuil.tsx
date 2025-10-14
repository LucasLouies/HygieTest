import { getAllBieres, type BiereResponse } from "../../api/Bieres/getAllBieres";
import { Header } from "../Header";
import { useLayoutEffect, useState } from "react";

export function Acceuil() {
    const [bieres, setBieres] = useState<BiereResponse | null>(null);
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
        aze
    </>
}