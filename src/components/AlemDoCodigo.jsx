import { useEffect, useRef } from 'react'
import '../styles/alemDoCodigo.css'
import { initAlemDoCodigo } from '../scripts/alemDoCodigo'

// Lista dos diferenciais que vão além do conteúdo técnico.
// O primeiro item recebe destaque visual maior no grid para criar hierarquia parecida com a referência.
const beneficios = [
  {
    icon: 'career',
    title: 'Recrutadora semanal',
    description: 'Acompanhamento para currículo, LinkedIn, entrevistas e posicionamento profissional.',
    featured: true,
    pillars: ['Currículo', 'LinkedIn', 'Entrevistas', 'Carreira'],
  },
  {
    icon: 'mind',
    title: 'Alta performance',
    description: 'Terapeuta focado em mentalidade, constância, foco e evolução emocional.',
  },
  {
    icon: 'mentor',
    title: 'Mentorias semanais',
    description: 'Encontros com profissionais que vivem tecnologia e ajudam você a acelerar com direção.',
  },
  {
    icon: 'ai',
    title: 'Agentes de IA 24h',
    description: 'Assistentes para estudar, revisar código, destravar ideias e ganhar produtividade.',
  },
  {
    icon: 'support',
    title: 'Suporte humano',
    description: 'Ajuda real 7 dias por semana para dúvidas, obstáculos técnicos e decisões importantes.',
  },
  {
    icon: 'community',
    title: 'Comunidade gigante',
    description: 'Networking com profissionais de tecnologia, colaboração, inspiração e troca diária.',
  },
  {
    icon: 'jobs',
    title: 'Vagas exclusivas',
    description: 'Oportunidades selecionadas para quem está se preparando para entrar ou crescer no mercado.',
  },
]

function BenefitIcon({ type }) {
  // Ícones SVG lineares: deixam os cards mais premium e próximos da estética da referência.
  const iconProps = {
    width: '34',
    height: '34',
    viewBox: '0 0 34 34',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
  }

  if (type === 'mind') {
    return (
      <svg {...iconProps}>
        <path d="M17 5.5c-4.8 0-8.8 3.7-8.8 8.3 0 2.9 1.5 5.3 3.8 6.8v3.2h10v-3.2c2.3-1.5 3.8-3.9 3.8-6.8 0-4.6-4-8.3-8.8-8.3Z" />
        <path d="M13 15.2c1.3-1.5 2.6-1.5 4 0 1.4-1.5 2.8-1.5 4.1 0" />
        <path d="M13 28h8" />
      </svg>
    )
  }

  if (type === 'mentor') {
    return (
      <svg {...iconProps}>
        <path d="M8 22.5c1.9-3 4.8-4.5 9-4.5s7.1 1.5 9 4.5" />
        <path d="M17 15.5a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
        <path d="M6.5 26.5h21" />
      </svg>
    )
  }

  if (type === 'ai') {
    return (
      <svg {...iconProps}>
        <path d="M17 5v4" />
        <path d="M17 25v4" />
        <path d="M5 17h4" />
        <path d="M25 17h4" />
        <path d="M11 11l-2.8-2.8" />
        <path d="M25.8 25.8 23 23" />
        <path d="M23 11l2.8-2.8" />
        <path d="M8.2 25.8 11 23" />
        <path d="M17 11.5 19 15l3.5 2-3.5 2-2 3.5-2-3.5-3.5-2 3.5-2 2-3.5Z" />
      </svg>
    )
  }

  if (type === 'support') {
    return (
      <svg {...iconProps}>
        <path d="M9 18V14a8 8 0 0 1 16 0v4" />
        <path d="M9 18h4v6H9a3 3 0 0 1-3-3v0a3 3 0 0 1 3-3Z" />
        <path d="M25 18h-4v6h4a3 3 0 0 0 3-3v0a3 3 0 0 0-3-3Z" />
        <path d="M21 27h-4" />
      </svg>
    )
  }

  if (type === 'community') {
    return (
      <svg {...iconProps}>
        <path d="M17 15a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z" />
        <path d="M8.5 18.5a3.5 3.5 0 1 0 0-7" />
        <path d="M25.5 18.5a3.5 3.5 0 1 1 0-7" />
        <path d="M9.5 27c1.4-3.8 3.9-5.7 7.5-5.7s6.1 1.9 7.5 5.7" />
      </svg>
    )
  }

  if (type === 'jobs') {
    return (
      <svg {...iconProps}>
        <path d="M11 10V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v2" />
        <path d="M7 11h20v16H7V11Z" />
        <path d="M7 17h20" />
        <path d="M15 20h4" />
      </svg>
    )
  }

  return (
    <svg {...iconProps}>
      <path d="M7 25 25 7" />
      <path d="M10 8h14v14" />
      <path d="M9 25h10" />
      <path d="M7 23v-8" />
    </svg>
  )
}

function AlemDoCodigo() {
  // Referência da seção principal para escopar todas as animações GSAP dentro deste componente.
  const sectionRef = useRef(null)

  // Inicializa as animações de entrada dos textos, cards e brilho de fundo.
  useEffect(() => initAlemDoCodigo(sectionRef.current), [])

  return (
    <section className="alem-section" id="alem-do-codigo" ref={sectionRef}>
      {/* Fundo compacto com glow e linhas sutis para diferenciar a seção sem pesar visualmente. */}
      <div className="alem-bg-glow" aria-hidden="true" />
      <div className="alem-bg-lines" aria-hidden="true" />

      {/* Container central: limita a largura e transforma a seção em um bloco mais quadrado. */}
      <div className="alem-container">
        {/* Cabeçalho curto: apresenta a promessa antes do grid de cards. */}
        <header className="alem-header">
          <span className="alem-eyebrow">Evolução completa</span>
          <h2 className="alem-title">
            Tudo que você precisa <span>além do código</span>
          </h2>
          <p className="alem-intro">
            Direção, suporte humano, mentalidade, comunidade e oportunidades para evoluir mais rápido.
          </p>
        </header>

        {/* Grid compacto: cards quadrados com uma primeira card maior para destacar carreira. */}
        <div className="alem-cards-grid">
          {beneficios.map((beneficio) => (
            <article className={`alem-card ${beneficio.featured ? 'is-featured' : ''}`} key={beneficio.title}>
              <div className="alem-card-main">
                <span className="alem-card-icon" aria-hidden="true">
                  <BenefitIcon type={beneficio.icon} />
                </span>
                <h3>{beneficio.title}</h3>
                <p>{beneficio.description}</p>
              </div>

              {/* Lista lateral usada apenas na card destacada, inspirada na divisão da referência. */}
              {beneficio.pillars && (
                <div className="alem-card-pills" aria-label="Pilares do acompanhamento de carreira">
                  <span>Pilares</span>
                  {beneficio.pillars.map((pillar) => (
                    <strong key={pillar}>{pillar}</strong>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AlemDoCodigo
