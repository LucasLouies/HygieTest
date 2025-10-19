import { Header } from "../Header";

/**
 * page en cas de mauvais routing ou mauvais input de l'utilisateur
 */

export function Introuvable() {
    return <div>
        <Header />
        <p className="w-screen text-center py-40 font-semibold text-red-500 text-7xl">
            Page introuvable
        </p>
    </div>
}