import { useEffect, useRef } from 'react'
import '../styles/projetos.css'
import { initProjetos } from '../scripts/projetos'
import project01 from '../assets/projects/project-01.png'
import project02 from '../assets/projects/project-02.png'
import project03 from '../assets/projects/project-03.png'
import project04 from '../assets/projects/project-04.png'
import project05 from '../assets/projects/project-05.png'
import project06 from '../assets/projects/project-06.png'
import project07 from '../assets/projects/project-07.png'
import project08 from '../assets/projects/project-08.png'
import project09 from '../assets/projects/project-09.png'

// Projetos exibidos na galeria.
// Cada item representa um tipo de projeto prático que o aluno pode construir durante a jornada.
const projetos = [
  { title: 'E-commerce Dashboard', stack: 'React • APIs • UI', image: project01 },
  { title: 'Delivery App', stack: 'Mobile • UX • Estados', image: project02 },
  { title: 'Finance Analytics', stack: 'Dados • Gráficos • BI', image: project03 },
  { title: 'AI Chatbot', stack: 'IA • Automação • Chat', image: project04 },
  { title: 'Workflow Automation', stack: 'n8n • Node • Integrações', image: project05 },
  { title: 'Real Estate Landing', stack: 'HTML • CSS • Conversão', image: project06 },
  { title: 'Fitness App', stack: 'Mobile • Dashboard • Hábitos', image: project07 },
  { title: 'Data Visualization', stack: 'Dados • Métricas • Insights', image: project08 },
  { title: 'Portfolio Premium', stack: 'Front-end • Motion • Deploy', image: project09 },
]

function Projetos() {
  // Referência da seção para escopar animações GSAP apenas dentro deste componente.
  const sectionRef = useRef(null)

  // Inicializa entrada da seção e microinterações de wave hover nos cards.
  useEffect(() => initProjetos(sectionRef.current), [])

  return (
    <section className="projetos-section" id="projetos" ref={sectionRef}>
      {/* Elementos decorativos de fundo para manter a seção em harmonia com o restante da página. */}
      <div className="projetos-glow is-left" aria-hidden="true" />
      <div className="projetos-glow is-right" aria-hidden="true" />

      <div className="projetos-container">
        {/* Cabeçalho da seção: apresenta a promessa de aprender construindo projetos reais. */}
        <header className="projetos-header">
          <span className="projetos-eyebrow">Portfólio na prática</span>
          <h2 className="projetos-title">
            Tudo com Projetos <span>Práticos e Reais</span>
          </h2>
          <p>
            A ideia não é só assistir aulas: é construir interfaces, dashboards, automações, apps e
            experiências que parecem projetos de mercado.
          </p>
        </header>

        {/* Galeria com efeito wave: os cards vizinhos reagem quando um projeto recebe hover. */}
        <div className="projetos-wave-gallery" aria-label="Projetos práticos desenvolvidos na jornada">
          {projetos.map((projeto, index) => (
            <article className="projeto-card" data-project-card key={projeto.title}>
              <img src={projeto.image} alt={`Projeto ${projeto.title}`} loading="eager" decoding="async" />
              <div className="projeto-card-overlay">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{projeto.title}</h3>
                <p>{projeto.stack}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projetos
