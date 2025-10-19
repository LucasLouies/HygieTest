type ButtonProps = {
    action: () => void;
    label: string;
}

/**
 * l'élément qui sert de bouton standard dans le site web
 * @param action l'action à faire quand le bouton est appuyé
 * @param label le label à afficher dans le bouton
 */

export function CustomButton({ action, label }: ButtonProps) {
    return <>
        <button onClick={action}
            className="
            bg-blue-500 text-white 
            rounded-md px-4 py-2 
            text-base cursor-pointer 
            transition-all duration-200 
            ml-2
            max-w-1/6
            hover:bg-blue-700 
            active:bg-blue-800 
            active:translate-y-[2px] 
            focus:outline-none focus:ring-2 focus:ring-blue-300">
            {label}
        </button>
    </>
}