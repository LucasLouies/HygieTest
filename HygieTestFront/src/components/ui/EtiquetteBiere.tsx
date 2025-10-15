import type { Biere } from "../../api/Bieres/getAllBieres"
import { CustomText } from "./CustomText"

type EtiquetteBiereProps = {
    biere: Biere
}

export function EtiquetteBiere({ biere }: EtiquetteBiereProps) {
    return <div className="border border-b-blue-700 rounded-xl flex-col shadow-md shadow-gray-400 ">
        <CustomText text={biere.name} className="flex-1 justify-self-center" title={true} size={4} />
        <div className="flex-4">
            <img src={"https://localhost:7172/" + biere.logo} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 flex">
            <CustomText text={biere.prix + "€"} className="flex-1 text-center" size={2} />
            <CustomText text={biere.degre + "°"} className="flex-1 text-center" size={2} />
        </div>

    </div>
}