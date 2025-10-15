type CustomTextProps = {
    size?: 1 | 2 | 3 | 4;
    title?: boolean;
    text: string;
    className?: string;
}

export function CustomText({ size, title, text, className }: CustomTextProps) {
    switch (size) {
        case 1:
            className += " text-base "
            break;
        case 2:
            className += " text-lg "
            break;
        case 3:
            className += " text-xl "
            break;
        case 4:
            className += " text-2xl "
            break;
        default:
            className += " text-base "
            break;
    }

    if (title) {
        className += " font-bold underline "
    }

    return <p className={className + "font-size font-mono text-blue-950"}>
        {text}
    </p>
}