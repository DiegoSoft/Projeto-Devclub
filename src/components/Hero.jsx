import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Button from './Button'
import '../styles/hero.css'
import logo from '../assets/logo.png'

// Registra o plugin do GSAP usado para criar animações conectadas ao scroll.
gsap.registerPlugin(ScrollTrigger)

// Linhas exibidas no card de código do Hero. Mantemos os textos em um array para renderizar com map.
const codeLines = [
  "const desenvolvedor = aluno",
  "  .aprenderFundamentos()",
  "  .criarProjetosReais()",
  "  .resolverProblemas()",
  "  .construirPortfolio()",
  "  .conquistarPrimeiraVaga();",
];

// Empresas usadas na faixa dinâmica abaixo do Hero. A lista é duplicada no JSX para criar o loop infinito.
const companies = [
  'iFood',
  'Nubank',
  'XP Inc',
  'Mercado Livre',
  'CVC',
  'Stone',
  'PicPay',
  'Itaú',
  'Globo',
  'Ambev',
  'Magalu',
  'Bradesco',
]

function Hero() {
  // Referência principal do Hero. O GSAP usa esse elemento como escopo das animações.
  const heroRef = useRef(null)

  // Referência da lista de empresas para medir o tamanho real e animar o deslocamento horizontal.
  const companiesListRef = useRef(null)

  // Evita que a animação de entrada rode mais de uma vez no mesmo carregamento do componente.
  const hasPlayedRef = useRef(false)

  useLayoutEffect(() => {
    // gsap.context limita seletores e animações ao Hero, facilitando a limpeza quando o componente desmonta.
    const context = gsap.context(() => {
      let companiesTween

      // Cria o marquee das empresas medindo metade da largura da lista duplicada.
      // Assim o movimento fica contínuo e sem cortes visuais.
      const startCompaniesMarquee = () => {
        const companiesList = companiesListRef.current
        if (!companiesList) return

        companiesTween?.kill()
        gsap.set(companiesList, { x: 0 })

        const distance = companiesList.scrollWidth / 2
        const duration = Math.max(18, distance / 55)

        companiesTween = gsap.to(companiesList, {
          x: -distance,
          duration,
          repeat: -1,
          ease: 'none',
          modifiers: {
            x: gsap.utils.unitize((value) => Number.parseFloat(value) % distance),
          },
        })
      }

      // Quando o usuário volta para a aba, reiniciamos o marquee para evitar animação congelada.
      const handleVisibilityChange = () => {
        if (document.visibilityState === 'visible') startCompaniesMarquee()
      }

      // Timeline principal de entrada. Ela roda uma vez quando o loading termina ou pelo fallback.
      const playEntrance = () => {
        if (hasPlayedRef.current) return
        hasPlayedRef.current = true

        const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Entrada em cascata dos elementos internos do Hero.
        timeline
          .to('.hero-section', { autoAlpha: 1, duration: 0.1 })
          .from('.hero-content', { y: 24, autoAlpha: 0, filter: 'blur(12px)', duration: 2.0 })
          .from('.hero-eyebrow', { y: 18, autoAlpha: 0, filter: 'blur(5px)', duration: 0.7 }, '-=0.55')
          .from('.hero-title-line', { yPercent: 112, rotateX: -18, filter: 'blur(8px)', duration: 1.18, stagger: 0.14 }, '-=0.38')
          .from('.hero-copy', { y: 18, autoAlpha: 0, filter: 'blur(8px)', duration: 0.98 }, '-=0.42')
          .from('.hero-actions', { y: 22, autoAlpha: 0, scale: 0.98, duration: 0.62 }, '-=0.38')
          .from('.hero-stat', { y: 16, autoAlpha: 0, duration: 0.48, stagger: 0.08 }, '-=0.24')
          .from('.hero-visual', { x: 42, scale: 0.88, rotate: -3, autoAlpha: 0, filter: 'blur(12px)', duration: 0.95 }, '-=1.1')
          .from('.hero-logo-core', { scale: 0.72, rotate: -10, autoAlpha: 0, duration: 0.8 }, '-=0.52')
          .from('.hero-orbit', { scale: 0.72, autoAlpha: 0, duration: 0.82, stagger: 0.08 }, '-=0.66')
          .from('.hero-card', { y: 34, autoAlpha: 0, scale: 0.9, rotate: -2, filter: 'blur(8px)', duration: 1.05, stagger: 0.18 }, '-=0.42')
          .from('.code-line', { x: -16, autoAlpha: 0, duration: 0.38, stagger: 0.06 }, '-=0.32')
          .from('.hero__companies-track', { y: 18, autoAlpha: 0, duration: 0.62 }, '-=0.1')

        // Rotação contínua dos anéis decorativos ao redor do logo.
        gsap.to('.hero-orbit', {
          rotate: 360,
          duration: 18,
          repeat: -1,
          ease: 'none',
        })

        // Segundo anel gira no sentido contrário para criar profundidade visual.
        gsap.to('.hero-orbit.reverse', {
          rotate: -360,
          duration: 24,
          repeat: -1,
          ease: 'none',
        })

        // Partículas decorativas sobem de forma aleatória para dar vida ao fundo do Hero.
        gsap.to('.hero-ember', {
          y: -80,
          x: 'random(-24, 24)',
          autoAlpha: 0,
          scale: 'random(0.4, 1)',
          duration: 'random(2.6, 4.8)',
          repeat: -1,
          stagger: { each: 0.18, repeat: -1 },
          ease: 'sine.out',
        })

        // Movimento leve e contínuo dos cards do lado direito depois da entrada inicial.
        gsap.to('.hero-card', {
          y: -12,
          duration: 3.1,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.18,
        })

        // Brilho suave na linha verde do título para reforçar o ponto de destaque.
        gsap.to('.hero-title-line.accent', {
          textShadow: '0 0 34px rgba(57, 211, 83, 0.62)',
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        // Pequeno glow no eyebrow para manter o topo do texto vivo sem distrair.
        gsap.to('.hero-eyebrow', {
          color: '#ffffff',
          textShadow: '0 0 18px rgba(57, 211, 83, 0.42)',
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })

        // Movimento mínimo nas linhas não destacadas do título para uma sensação premium.
        gsap.to('.hero-title-line:not(.accent)', {
          y: -4,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          stagger: 0.22,
        })
      }

      // Fallback garante que o Hero apareça mesmo se o evento do loading não for disparado.
      const fallback = gsap.delayedCall(0.7, playEntrance)

      // Inicia a barra de empresas logo após o componente montar.
      const marqueeStart = gsap.delayedCall(0.2, startCompaniesMarquee)

      // Eventos que disparam ou reiniciam animações importantes do Hero.
      document.addEventListener('devclub:hero-entrance', playEntrance)
      document.addEventListener('visibilitychange', handleVisibilityChange)
      window.addEventListener('pageshow', startCompaniesMarquee)
      window.addEventListener('focus', startCompaniesMarquee)
      window.addEventListener('resize', startCompaniesMarquee)

      // Parallax suave do grid de fundo durante o scroll.
      gsap.to('.hero-bg-grid', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Parallax suave do bloco visual direito durante o scroll.
      gsap.to('.hero-visual', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Limpeza: remove timers, animações e listeners para evitar vazamento de memória.
      return () => {
        fallback.kill()
        marqueeStart.kill()
        companiesTween?.kill()
        document.removeEventListener('devclub:hero-entrance', playEntrance)
        document.removeEventListener('visibilitychange', handleVisibilityChange)
        window.removeEventListener('pageshow', startCompaniesMarquee)
        window.removeEventListener('focus', startCompaniesMarquee)
        window.removeEventListener('resize', startCompaniesMarquee)
      }
    }, heroRef)

    return () => context.revert()
  }, [])

  return (
    <section className="hero-section" id="hero" ref={heroRef}>
      {/* Elementos de fundo: ancora, grid, textura e partículas. */}
      <span id="home" className="hero-anchor" aria-hidden="true" />
      <div className="hero-bg-grid" aria-hidden="true" />
      <div className="hero-noise" aria-hidden="true" />

      <div className="hero-embers" aria-hidden="true">
        {Array.from({ length: 22 }).map((_, index) => (
          <span className="hero-ember" key={index} />
        ))}
      </div>

      {/* Conteúdo principal do Hero: texto, CTAs, métricas e visual de apoio. */}
      <div className="hero-inner">
        <div className="hero-content">
          <p className="hero-eyebrow">A Escola das Profissões do Futuro</p>

          <h2 className="hero-title">
            <span className="hero-title-mask">
              <span className="hero-title-line">Toda grande carreira</span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line accent">começa com</span>
            </span>
            <span className="hero-title-mask">
              <span className="hero-title-line">uma decisão.</span>
            </span>
          </h2>

          <p className="hero-copy">
            Aprenda com quem vive tecnologia todos os dias e construa projetos reais para conquistar
            sua oportunidade.
          </p>

          {/* Botões principais de conversão do Hero. */}
          <div className="hero-actions">
            <Button href="#reserve" className="hero-primary-cta">
              Começar minha jornada
            </Button>
            <Button href="#dishes" variant="outline" className="hero-secondary-cta">
              Ver formações
            </Button>
          </div>

          {/* Métricas rápidas para gerar confiança logo no primeiro viewport. */}
          <div className="hero-stats" aria-label="DevClub highlights">
            <div className="hero-stat">
              <strong>+25k</strong>
              <span>alunos no Brasil e no mundo</span>
            </div>
            <div className="hero-stat">
              <strong>+100</strong>
              <span>projetos para portfolio</span>
            </div>
            <div className="hero-stat">
              <strong>4.9/5</strong>
              <span>avaliação média</span>
            </div>
          </div>
        </div>

        {/* Visual direito: logo, órbitas e cards para representar tecnologia e evolução. */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-orbit" />
          <div className="hero-orbit reverse" />

          <div className="hero-logo-core">
            <img src={logo} alt="" />
          </div>

          <div className="hero-card hero-code-card">
            <div className="code-window-bar">
              <span />
              <span />
              <span />
            </div>
            <pre>
              {codeLines.map((line) => (
                <span className="code-line" key={line}>
                  {line}
                </span>
              ))}
            </pre>
          </div>

          <div className="hero-card hero-terminal-card">
            <span className="terminal-prompt">$ carreira --start</span>
            <strong>Front-End</strong>
          </div>

          <div className="hero-card hero-level-card">
            <span>Jornada</span>
            <strong>FullStack</strong>
          </div>
        </div>
      </div>

      {/* Faixa de empresas: reforça autoridade mostrando marcas conhecidas em movimento. */}
      <div className="hero__companies-track" aria-label="Empresas brasileiras de tecnologia e inovação">
        <p className="hero__companies-copy">Alunos preparados para empresas como</p>
        <div className="hero__companies-marquee">
          <div className="hero__companies-list" ref={companiesListRef}>
            {[...companies, ...companies].map((company, index) => (
              <span className="hero__company" key={`${company}-${index}`}>
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
