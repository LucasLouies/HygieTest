import type { Brasserie } from "../../api/Brasseries/getAllBrasseries"
import { CustomText } from "../ui/CustomText"

export type AffichageBrasserieProps = {
    brasserie: Brasserie
}

export function AffichageBrasserie({ brasserie }: AffichageBrasserieProps) {
    return <>
        <div className="w-screen flex justify-center p-2">
            <div className="w-3/4 bg-gray-300 flex border border-black rounded-b-md overflow-hidden shadow-md">
                <img src={"https://localhost:7172/" + brasserie.logo} className="flex-1 h-40 object-scale-down" />
                <CustomText text={brasserie.name} className="flex-1 p-2 flex items-center justify-center" size={3} />
            </div>
        </div>
    </>
}