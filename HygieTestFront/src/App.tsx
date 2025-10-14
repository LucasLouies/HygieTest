import { Route, Routes } from 'react-router'
import { Acceuil } from './components/Acceuil/Acceuil'
import { Introuvable } from './components/Introuvable/Introuvable'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Acceuil />} />
        <Route path="*" element={<Introuvable />} />
      </Routes>
    </>
  )
}

export default App