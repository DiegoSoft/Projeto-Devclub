import { useEffect, useRef } from 'react'
import '../styles/professores.css'
import { initProfessores } from '../scripts/professores'
import Rodolfo from '../assets/professores/Rodolfo.jpg'
import Fernanda from '../assets/professores/fernanda.jpg'
import Agustinho from '../assets/professores/agustinho.jpg'
import Henrique from '../assets/professores/henrique.jpg'
import Marcio from '../assets/professores/marcio.jpg'
import Juliana from '../assets/professores/juliana.jpg'
import Mateus from '../assets/professores/mateus.jpg'

// Lista central dos professores exibidos na seção.
// Mantemos os dados separados do JSX para facilitar futuras alterações de nome, cargo ou imagem.
const professores = [
  {
    name: 'Rodolfo Mori',
    role: 'Fundador e mentor principal',
    image: Rodolfo,
    tag: 'Full Stack',
  },
  {
    name: 'Fernanda',
    role: 'Mentora de carreira e produto',
    image: Fernanda,
    tag: 'Carreira',
  },
  {
    name: 'Agustinho',
    role: 'Especialista em back-end',
    image: Agustinho,
    tag: 'Back-End',
  },
  {
    name: 'Henrique',
    role: 'Instrutor de front-end moderno',
    image: Henrique,
    tag: 'Front-End',
  },
  {
    name: 'Márcio',
    role: 'Mentor de arquitetura e mercado',
    image: Marcio,
    tag: 'Arquitetura',
  },
  {
    name: 'Juliana',
    role: 'Especialista em UX e projetos reais',
    image: Juliana,
    tag: 'UX/UI',
  },
  {
    name: 'Mateus',
    role: 'Instrutor mobile e automações',
    image: Mateus,
    tag: 'Mobile',
  },
]

function Professores() {
  // Referência da seção inteira para escopar as animações GSAP apenas neste componente.
  const sectionRef = useRef(null)

  // Inicializa as animações quando o componente entra na tela e limpa tudo quando ele for desmontado.
  useEffect(() => initProfessores(sectionRef.current), [])

  return (
    <section className="professores-section" id="professores" ref={sectionRef}>
      {/* Brilhos decorativos de fundo para manter a identidade visual verde/roxa da página. */}
      <div className="professores-glow is-mint" aria-hidden="true" />
      <div className="professores-glow is-purple" aria-hidden="true" />

      <div className="professores-container">
        {/* Cabeçalho da seção: apresenta o valor humano por trás das formações. */}
        <header className="professores-header">
          <span className="professores-eyebrow">Quem guia sua jornada</span>
          <h2 className="professores-title">
            Aprenda com <span>professores que vivem tecnologia</span>
          </h2>
          <p>
            Uma equipe preparada para transformar teoria em prática, tirar dúvidas e aproximar cada
            aluno dos desafios reais do mercado.
          </p>
        </header>

        {/* Carrossel circular: os cards orbitam e o card ativo fica em destaque no centro. */}
        <div className="professores-carousel" aria-label="Carrossel circular de professores">
          {/* Trilha visual da órbita para reforçar o efeito circular. */}
          <div className="professores-orbit-line" aria-hidden="true" />

          {/* Botão para voltar ao professor anterior. */}
          <button className="professores-carousel-control is-prev" type="button" data-professor-prev aria-label="Professor anterior">
            ←
          </button>

          {/* Área onde o GSAP posiciona cada professor ao redor do círculo. */}
          <div className="professores-carousel-stage">
            {professores.map((professor, index) => (
              <article
                className="professor-card"
                data-professor-card
                key={professor.name}
                style={{ '--professor-index': index }}
                tabIndex="0"
              >
                {/* Moldura da imagem com leve camada de glow para destacar o rosto. */}
                <div className="professor-photo-wrap">
                  <img src={professor.image} alt={`Professor ${professor.name}`} loading={index < 3 ? 'eager' : 'lazy'} />
                </div>

                {/* Conteúdo textual do card, separado para facilitar animações e leitura. */}
                <div className="professor-card-content">
                  <span>{professor.tag}</span>
                  <h3>{professor.name}</h3>
                  <p>{professor.role}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Botão para avançar ao próximo professor. */}
          <button className="professores-carousel-control is-next" type="button" data-professor-next aria-label="Próximo professor">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default Professores
