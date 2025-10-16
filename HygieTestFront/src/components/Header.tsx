import { useLocation } from "react-router"

const baseStyle = "flex-1 text-center text-white hover:bg-slate-700 px-2 py-1 rounded";
const selectedStyle = "flex-1 text-center text-white bg-slate-700 px-2 py-1 rounded";

export function Header() {
    const { pathname } = useLocation();

    return <nav className="flex flex-row w-full p-2 bg-slate-600">
        <a href="/" className={pathname == "/" ? selectedStyle : baseStyle}>
            Acceuil
        </a>
        <a href="/AjouterBiere" className={pathname == "/AjouterBiere" ? selectedStyle : baseStyle}>
            Biere
        </a>
        <a href="/Brasserie" className={pathname == "/Brasserie" ? selectedStyle : baseStyle}>
            Brasserie
        </a>
        <a href="/Grossiste" className={pathname == "/Grossiste" ? selectedStyle : baseStyle}>
            Grossiste
        </a>
        <a href="/Stock" className={pathname == "/Stock" ? selectedStyle : baseStyle}>
            Stock
        </a>
        <a href="/Devis" className={pathname == "/Devis" ? selectedStyle : baseStyle}>
            Devis
        </a>
        <a href="/Service" className={pathname == "/Service" ? selectedStyle : baseStyle}>
            Connexion
        </a>
    </nav>
}