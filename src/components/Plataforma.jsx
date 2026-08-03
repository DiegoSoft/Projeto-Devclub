import { useEffect, useRef } from 'react'
import '../styles/plataforma.css'
import { initPlataforma } from '../scripts/plataforma'
import plataformaPreview from '../assets/plataforma-preview.png'

// Recursos principais que o aluno encontra dentro da plataforma.
// Mantemos em array para renderizar os cards de forma limpa e facilitar manutenção.
const platformFeatures = [
  {
    icon: 'play',
    title: 'Plataforma de Ensino',
    description: 'Aulas organizadas, progresso visual e uma experiência moderna para estudar com clareza.',
  },
  {
    icon: 'map',
    title: 'Trilhas e Formações',
    description: 'Cursos conectados por jornadas para evoluir do zero até projetos mais avançados.',
  },
  {
    icon: 'community',
    title: 'Comunidade de alunos',
    description: 'Troca diária com pessoas que estão aprendendo, criando projetos e buscando oportunidades.',
  },
  {
    icon: 'ai',
    title: 'Club Agents',
    description: 'IA’s para acelerar estudo, revisar ideias, tirar dúvidas e destravar sua evolução.',
  },
  {
    icon: 'lab',
    title: 'Playground de Treinamento',
    description: 'Ambiente para praticar, testar conceitos e transformar aula em experiência real.',
  },
 /* {
    icon: 'star',
    title: 'Mural da Fama',
    description: 'Espaço para destacar alunos, conquistas, projetos e histórias que inspiram a comunidade.',
  }, */
]

function PlatformIcon({ type }) {
  // Ícones SVG simples para manter a seção leve e consistente com os componentes anteriores.
  const iconProps = {
    width: '22',
    height: '22',
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (type === 'map') {
    return (
      <svg {...iconProps}>
        <path d="M4 6.5 9.5 4l5 2.5L20 4v13.5l-5.5 2.5-5-2.5L4 20V6.5Z" />
        <path d="M9.5 4v13.5" />
        <path d="M14.5 6.5V20" />
      </svg>
    )
  }

  if (type === 'community') {
    return (
      <svg {...iconProps}>
        <path d="M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
        <path d="M4.5 19c1.3-3.4 3.8-5.1 7.5-5.1s6.2 1.7 7.5 5.1" />
        <path d="M5.5 12.5a2.5 2.5 0 1 0 0-5" />
        <path d="M18.5 12.5a2.5 2.5 0 1 1 0-5" />
      </svg>
    )
  }

  if (type === 'ai') {
    return (
      <svg {...iconProps}>
        <path d="M12 3v3" />
        <path d="M12 18v3" />
        <path d="M3 12h3" />
        <path d="M18 12h3" />
        <path d="M12 8.5 13.5 11l2.5 1-2.5 1L12 15.5 10.5 13 8 12l2.5-1L12 8.5Z" />
      </svg>
    )
  }

  if (type === 'lab') {
    return (
      <svg {...iconProps}>
        <path d="M9 3h6" />
        <path d="M10 3v5l-4.5 8A3.2 3.2 0 0 0 8.3 21h7.4a3.2 3.2 0 0 0 2.8-5L14 8V3" />
        <path d="M8 16h8" />
      </svg>
    )
  }

  if (type === 'star') {
    return (
      <svg {...iconProps}>
        <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
      </svg>
    )
  }

  return (
    <svg {...iconProps}>
      <path d="M8 5.5v13l10-6.5-10-6.5Z" />
      <path d="M4 4h16v16H4V4Z" />
    </svg>
  )
}

function Plataforma() {
  // Referência da seção para escopar as animações GSAP e o Scroll Zoom.
  const sectionRef = useRef(null)

  // Inicializa a entrada dos elementos e o zoom da imagem conectado ao scroll.
  useEffect(() => initPlataforma(sectionRef.current), [])

  return (
    <section className="plataforma-section" id="plataforma" ref={sectionRef}>
      {/* Luzes decorativas de fundo para diferenciar a seção mantendo a mesma paleta. */}
      <div className="plataforma-glow is-mint" aria-hidden="true" />
      <div className="plataforma-glow is-purple" aria-hidden="true" />

      <div className="plataforma-container">
        {/* Cabeçalho compacto: apresenta rapidamente a promessa da plataforma. */}
        <header className="plataforma-header">
          <span className="plataforma-eyebrow">Dentro da plataforma</span>
          <h2 className="plataforma-title">
            Um ambiente completo para <span>aprender, praticar e evoluir</span>
          </h2>
          <p>
            Você terá acesso a aulas, comunidade, vagas, IA’s para acelerar seu progresso e suporte
            dos professores durante a jornada.
          </p>
        </header>

        <div className="plataforma-showcase">
          {/* Mockup visual: a imagem recebe zoom controlado pelo scroll para criar impacto. */}
          <div className="plataforma-preview-card">
            <div className="plataforma-browser-bar" aria-hidden="true">
              <span />
              <span />
              <span />
              <strong>app.devclub.com.br</strong>
            </div>

            <div className="plataforma-image-mask">
              <img src={plataformaPreview} alt="Prévia visual da plataforma de ensino DevClub" />
            </div>

            {/* Badges flutuantes: reforçam recursos importantes sobre a imagem. */}
            <span className="plataforma-floating-badge is-top">Aulas por trilhas</span>
            <span className="plataforma-floating-badge is-bottom">IA + suporte humano</span>
          </div>

          {/* Card deck: os recursos ficam agrupados e cada clique joga o card superior para revelar o próximo. */}
          <div className="plataforma-features-grid" style={{ '--stack-count': platformFeatures.length }}>
            {platformFeatures.map((feature, index) => (
              <article
                className="plataforma-feature-card"
                data-stack-card
                key={feature.title}
                style={{ '--stack-index': index }}
              >
                <span className="plataforma-feature-icon" aria-hidden="true">
                  <PlatformIcon type={feature.icon} />
                </span>
                <div className="plataforma-feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Plataforma
