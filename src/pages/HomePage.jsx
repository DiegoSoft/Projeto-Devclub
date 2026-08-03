
import { useState } from 'react'
import Navbar from '../components/NavBar'
import Hero from '../components/Hero'
import Sobre from '../components/Sobre'
import Formacoes from '../components/Formacoes'
import Mercado from '../components/Mercado'
import AlemDoCodigo from '../components/AlemDoCodigo'
import Plataforma from '../components/Plataforma'
import Projetos from '../components/Projetos'
import Depoimentos from '../components/Depoimentos'
import Professores from '../components/Professores'
import Faq from '../components/Faq'
import Footer from '../components/Footer'



import LoadingScreen from '../components/LoadingScreen'

function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
   

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
   
    <Navbar />
 
     <main>
       <Hero />
       <Sobre />
       <Formacoes />
       <AlemDoCodigo />
       <Plataforma />
       <Projetos />
       <Depoimentos />
       <Professores />
        <Mercado />
       <Faq />
       <Footer />

      </main>  
    </>
  )
}

export default HomePage


                        
