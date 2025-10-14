type ButtonProps = {
    action: () => void;
    label: string;
}

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