import { useLayoutEffect, useState } from "react";
import { Header } from "../Header";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getStockFromGrossiste, type Stock } from "../../api/Stock/getStockFromGrossiste";
import { CustomText } from "../ui/CustomText";

type Error = "NoError" | "ErrorApi";

export function Devis() {
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null);
    const [selectedGrossiste, setSelectedGrossiste] = useState<Grossiste | null>(null);
    const [stock, setStock] = useState<Stock[] | null>(null);
    const [error, setError] = useState<Error>("NoError");

    useLayoutEffect(() => {
        const initStock = async () => {
            if (grossistes == null) {
                const tmpGrossiste = await getAllGrossistes();

                if (tmpGrossiste == null) {
                    setError("ErrorApi")
                }

                setGrossistes(tmpGrossiste);
            } else {
                if (selectedGrossiste != null) {
                    const tmpStock = await getStockFromGrossiste(selectedGrossiste.id);
                    setStock(tmpStock);
                }
            }

        }
        initStock();
    }, [selectedGrossiste])

    return <>
        <Header />
        {
            grossistes && grossistes.length > 0 && (
                <div className="w-full">
                    <label>
                        Grossiste :
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
                    </label>
                </div>)
        }
        {
            selectedGrossiste && stock && stock.length == 0 && <CustomText text="CE GROSSISTE NE PROPOSE PAS DE BIERES POUR LE MOMENT !" />
        }
        {
            selectedGrossiste && stock && stock.length > 0 && <>aze</>
        }
    </>
}