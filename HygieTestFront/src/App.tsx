import { Route, Routes } from 'react-router'
import { Acceuil } from './components/Acceuil/Acceuil'
import { Introuvable } from './components/Introuvable/Introuvable'
import { AjoutBiere } from './components/AjoutBiere/AjoutBiere'
import { Brasserie } from './components/Brasserie/Brasserie'
import { Grossiste } from './components/Grossiste/Grossiste'
import { Stock } from './components/Stock/Stock'
import { Devis } from './components/Devis/Devis'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path='/AjouterBiere' element={<AjoutBiere />} />
        <Route path='/Brasserie' element={<Brasserie />} />
        <Route path='/Grossiste' element={<Grossiste />} />
        <Route path='/Stock' element={<Stock />} />
        <Route path='/Devis' element={<Devis />} />
        <Route path="*" element={<Introuvable />} />
      </Routes>
    </>
  )
}

export default App