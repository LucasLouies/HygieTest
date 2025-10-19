export type CustomSelectProps = {
    table: any[];
    selectedElement: any;
    setSelectedElement: (any: any) => void;
    label: string;
}

/**
 * le select standard du site
 * @param table le tableau qui contient tous les éléments de la selection
 * !les éléments du tableau DOIVENT avoir un élément appelé id 
 * !le select n'est pensé que pour pouvoir itérer sur un tableau
 * @param selectedElement l'élément selectionné
 * @param setSelectedElement la méthode qui permet de changer l'élément selectionné
 * @param label le label de l'élément null (celui de base/le premier)
 */

export function CustomSelect({ table, selectedElement, setSelectedElement, label }: CustomSelectProps) {
    return <div className="w-full flex flex-col">
        <select
            value={selectedElement?.id || ""}
            onChange={(e) => {
                const selected = table.find((ele) => String(ele.id) === e.target.value);
                setSelectedElement(selected!);
            }}
            className="
                w-full
                rounded-xl
                border border-gray-300
                bg-white
                py-2
                text-gray-700
                text-center
                shadow-sm
                focus:outline-none
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                transition-all duration-200
                hover:border-blue-400
                cursor-pointer
                ">
            <option value="">{`${label}`}</option>
            {table.map((element) => (
                <option key={element.id} value={element.id}>
                    {element.name}
                </option>
            ))}
        </select>
    </div>
}
