import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '../styles/sobre.css'

gsap.registerPlugin(ScrollTrigger)

// Conteúdo dos pilares da seção. Usar array deixa o componente mais fácil de manter e expandir.
const pillars = [
  {
    number: '01',
    title: 'Metodologia prática e aplicada',
    text: 'Aprenda fazendo, com projetos reais, desafios práticos e aplicações que simulam o dia a dia de empresas de tecnologia.',
    icon: 'code',
  },
  {
    number: '02',
    title: 'Formações focadas no mercado',
    text: 'Trilhas completas em Front-end, Back-end, Full Stack e Mobile, construídas com base nas tecnologias mais exigidas.',
    icon: 'path',
  },
  {
    number: '03',
    title: 'Acompanhamento que gera resultado',
    text: 'Mentorias, comunidade ativa, suporte e certificado para acelerar sua evolução profissional com direção clara.',
    icon: 'result',
  },
]

function PillarIcon({ type }) {
  // Ícones SVG normalizados com viewBox 24x24 para ficarem centralizados dentro do círculo.
  if (type === 'code') {
    return (
      <svg className="sobre-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M3 6H3.01919M3.01919 6H20.9809M3.01919 6C3 6.31438 3 6.70191 3 7.2002V16.8002C3 17.9203 3 18.4796 3.21799 18.9074C3.40973 19.2837 3.71547 19.5905 4.0918 19.7822C4.51921 20 5.079 20 6.19694 20L17.8031 20C18.921 20 19.48 20 19.9074 19.7822C20.2837 19.5905 20.5905 19.2837 20.7822 18.9074C21 18.48 21 17.921 21 16.8031L21 7.19691C21 6.70021 21 6.31368 20.9809 6M3.01919 6C3.04314 5.60768 3.09697 5.3293 3.21799 5.0918C3.40973 4.71547 3.71547 4.40973 4.0918 4.21799C4.51962 4 5.08009 4 6.2002 4H17.8002C18.9203 4 19.4796 4 19.9074 4.21799C20.2837 4.40973 20.5905 4.71547 20.7822 5.0918C20.9032 5.3293 20.957 5.60768 20.9809 6M20.9809 6H21M14 11L16 13L14 15M10 15L8 13L10 11"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'path') {
    return (
      <svg className="sobre-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M2 20H4M4 20H14M4 20V6.2002C4 5.08009 4 4.51962 4.21799 4.0918C4.40973 3.71547 4.71547 3.40973 5.0918 3.21799C5.51962 3 6.08009 3 7.2002 3H10.8002C11.9203 3 12.4796 3 12.9074 3.21799C13.2837 3.40973 13.5905 3.71547 13.7822 4.0918C14 4.5192 14 5.07899 14 6.19691V12M14 20H20M14 20V12M20 20H22M20 20V12C20 11.0681 19.9999 10.6024 19.8477 10.2349C19.6447 9.74481 19.2557 9.35523 18.7656 9.15224C18.3981 9 17.9316 9 16.9997 9C16.0679 9 15.6019 9 15.2344 9.15224C14.7443 9.35523 14.3552 9.74481 14.1522 10.2349C14 10.6024 14 11.0681 14 12M7 10H11M7 7H11"
          stroke="currentColor"
          strokeWidth="1.45"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  return (
    <svg className="sobre-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function Sobre() {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    // Escopa as animações para esta seção e limpa tudo automaticamente ao desmontar.
    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 72%',
          once: true,
        },
        defaults: { ease: 'power4.out' },
      })

      // Entrada do cabeçalho e dos cards em cascata quando a seção aparece.
      timeline
        .from('.sobre-eyebrow', { y: 18, autoAlpha: 0, filter: 'blur(6px)', duration: 0.55 })
        .from('.sobre-title', { y: 28, autoAlpha: 0, filter: 'blur(8px)', duration: 0.75 }, '-=0.25')
        .from('.sobre-intro', { y: 18, autoAlpha: 0, duration: 0.55 }, '-=0.3')
        .from('.sobre-card', { y: 38, autoAlpha: 0, scale: 0.94, filter: 'blur(10px)', duration: 0.85, stagger: 0.16 }, '-=0.15')
        .to('.sobre-card-line span', { xPercent: 260, duration: 1.15, stagger: 0.12 }, '-=0.55')

      // Movimento suave e contínuo dos ícones para deixar a seção mais viva.
      gsap.to('.sobre-icon-wrap', {
        y: -8,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.22,
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section className="sobre-section" id="about" ref={sectionRef}>
      <div className="sobre-bg-grid" aria-hidden="true" />

      <div className="sobre-container">
        {/* Cabeçalho institucional da seção Sobre. */}
        <header className="sobre-header">
          <p className="sobre-eyebrow">Por que a DevClub funciona</p>
          <h2 className="sobre-title">
            Uma formação criada para <span>gerar evolução real</span>
          </h2>
          <p className="sobre-intro">
            Mais do que assistir aulas, o aluno vive uma jornada prática: aprende, constrói,
            recebe direção e transforma conhecimento em projetos que mostram capacidade profissional.
          </p>
        </header>

        {/* Cards renderizados dinamicamente a partir do array pillars. */}
        <div className="sobre-pillars">
          {pillars.map((pillar) => (
            <article className="sobre-card" key={pillar.number}>
              <span className="sobre-card-number">{pillar.number}</span>
              <div>
                <div className="sobre-icon-wrap">
                  <PillarIcon type={pillar.icon} />
                </div>
                <h3 className="sobre-card-title">{pillar.title}</h3>
                <p className="sobre-card-text">{pillar.text}</p>
              </div>
              <span className="sobre-card-line" aria-hidden="true">
                <span />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sobre
