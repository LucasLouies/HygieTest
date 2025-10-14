import type { HTMLInputTypeAttribute } from "react";

type TextInputProps = {
    label: string;
    type?: HTMLInputTypeAttribute;
    text: string;
    setText: (newtext: string) => void;
    placeholder: string;
    className?: string
}

export function CustomInput({ text, setText, placeholder, className, type, label }: TextInputProps) {
    return <>
        <div className="w-full flex items-center space-x-4">

            <div className="flex-1">
                <p >{label}</p>
            </div>

            <div className="flex-8">
                <input type={type ? type : "text"}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={className + " border rounded p-2 w-1/4 mt-2 mb-2"}
                    placeholder={placeholder} />
            </div>
        </div>
    </>
}