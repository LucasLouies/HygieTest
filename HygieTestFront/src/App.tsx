import { Route, Routes } from 'react-router'
import { Introuvable } from './components/Introuvable/Introuvable'
import { Biere } from './components/Biere/Biere'
import { Brasserie } from './components/Brasserie/Brasserie'
import { Grossiste } from './components/Grossiste/Grossiste'
import { Stock } from './components/Stock/Stock'
import { Devis } from './components/Devis/Devis'
import { Accueil } from './components/Accueil/Accueil'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path='/AjouterBiere' element={<Biere />} />
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