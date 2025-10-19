import type { HTMLInputTypeAttribute } from "react";

type TextInputProps = {
    label?: string;
    type?: HTMLInputTypeAttribute;
    text: string;
    setText: (newtext: string) => void;
    placeholder: string;
    className?: string;
    labelAndInputClose?: boolean;
}

/**
 * L'input standard textuel
 * @param text la variable qui englobe l'input
 * @param setText la méthode qui fait varier l'input onChange
 * @param placeholder le placeholder de l'input
 * @param type le type de l'input (text, number, radio, ...)
 * @param className le style css tailwind qui peut être ajouter à la balise input
 * @param label le label à afficher sur la gauche de l'input
 * @param labelAndInputClose bool qui détermine la distance entre le label et l'input
 */

export function CustomInput({ text, setText, placeholder, className, type, label, labelAndInputClose }: TextInputProps) {
    return <>
        <div className="w-full flex items-center space-x-4">
            {
                label &&
                <div className="flex-1">
                    <p >{label}</p>
                </div>
            }

            <div className={labelAndInputClose ? "flex-1" : "flex-8"}>
                <input type={type ? type : "text"}
                    value={text}
                    onChange={(e) => {
                        setText(e.target.value);
                    }}
                    className={className + " border rounded p-2 w-1/4 mt-2 mb-2 min-w-20"}
                    placeholder={placeholder} />
            </div>
        </div>
    </>
}