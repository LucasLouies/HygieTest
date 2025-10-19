import { useLayoutEffect, useState } from "react";
import { Header } from "../Header";
import { getAllGrossistes, type Grossiste } from "../../api/Grossistes/getAllGrossistes";
import { getStockFromGrossiste, type Stock } from "../../api/Stock/getStockFromGrossiste";
import { CustomText } from "../ui/CustomText";
import { CustomButton } from "../ui/CustomButton";
import { AddStockForm } from "./AddStockForm";
import { AffichageStock } from "./AffichageStock";
import { CustomSelect } from "../ui/CustomSelect";

type Error = "NoError" | "ErrorApi";

/**
 * la page de gestion du stock de tous les grossistes
 */

export function Stock() {
    const [grossistes, setGrossistes] = useState<Grossiste[] | null>(null);
    const [selectedGrossiste, setSelectedGrossiste] = useState<Grossiste | null>(null);
    const [stock, setStock] = useState<Stock[] | null>(null);
    const [openStockForm, setOpenStockForm] = useState(false);

    const [error, setError] = useState<Error>("NoError");

    function ajouterStock(newStock: Stock) {

        if (stock != null) {
            for (let index = 0; index < stock.length; index++) {
                if (stock[index].bieresId == newStock.bieresId) {
                    var tmpStock = [...stock];
                    tmpStock[index].quantite = newStock.quantite
                    setStock(tmpStock);
                    return;
                }
            }
            setStock([...stock, newStock])
        }
    }

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
            grossistes && grossistes.length > 0 &&
            <div className="w-full flex items-center justify-center mt-2">
                <div className="w-1/2">
                    <CustomSelect
                        label="-- Choisir un grossiste --"
                        selectedElement={selectedGrossiste}
                        table={grossistes}
                        setSelectedElement={(grossiste: Grossiste) => setSelectedGrossiste(grossiste)} />
                </div>
            </div>
        }
        {
            stock && stock.length == 0 && <CustomText text="STOCK DU GROSSISTE VIDE !" size={4} />
        }
        {
            stock && stock.length > 0 && selectedGrossiste && <AffichageStock stock={stock} grossiste={selectedGrossiste} />
        }
        <CustomButton label="Modifier Stock" action={() => setOpenStockForm(!openStockForm)} />
        <div>
            {
                openStockForm && selectedGrossiste == null && <CustomText text="Veuillez choisir un grossiste !" />
            }
            {
                openStockForm && selectedGrossiste && <AddStockForm idGrossiste={selectedGrossiste.id} ajouterStock={ajouterStock} />
            }
        </div>

    </>
}