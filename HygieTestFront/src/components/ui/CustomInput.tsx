import type { HTMLInputTypeAttribute } from "react";

type TextInputProps = {
    label?: string;
    type?: HTMLInputTypeAttribute;
    text: string;
    setText: (newtext: string) => void;
    placeholder: string;
    className?: string;
    labelAndInputClose?: boolean;
    onChange?: (text: string) => void
}

export function CustomInput({ text, setText, placeholder, className, type, label, labelAndInputClose, onChange }: TextInputProps) {
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
                        if (onChange)
                            onChange(e.target.value)
                    }}
                    className={className + " border rounded p-2 w-1/4 mt-2 mb-2 min-w-20"}
                    placeholder={placeholder} />
            </div>
        </div>
    </>
}