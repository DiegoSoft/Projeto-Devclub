import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger para disparar a animação quando a seção entra no viewport.
gsap.registerPlugin(ScrollTrigger)

export function initMercado(rootElement) {
  // Evita executar animações antes da seção existir no DOM.
  if (!rootElement) return () => undefined

  // Contexto GSAP: mantém todos os seletores limitados a este componente.
  const context = gsap.context(() => {
    const rows = gsap.utils.toArray('[data-mercado-row]')
    const bars = gsap.utils.toArray('[data-mercado-bar]')

    // Estado inicial das barras: todas começam sem largura para criar o efeito de progresso.
    gsap.set(bars, {
      width: 0,
      transformOrigin: 'left center',
    })

    // Estado inicial do card e das linhas para uma entrada suave.
    gsap.set(['.mercado-header', '.mercado-card', rows], {
      willChange: 'transform, opacity, filter',
      force3D: true,
    })

    // Timeline principal: cabeçalho, card, linhas e barras aparecem em sequência.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 76%',
        toggleActions: 'restart none restart reset',
      },
      defaults: { ease: 'power3.out' },
    })

    timeline
      .from('.mercado-header', {
        y: 28,
        autoAlpha: 0,
        filter: 'blur(10px)',
        duration: 0.72,
      })
      .from(
        '.mercado-card',
        {
          y: 34,
          autoAlpha: 0,
          scale: 0.96,
          filter: 'blur(12px)',
          duration: 0.82,
        },
        '-=0.32',
      )
      .from(
        rows,
        {
          x: -22,
          autoAlpha: 0,
          duration: 0.52,
          stagger: 0.12,
        },
        '-=0.35',
      )
      .to(
        bars,
        {
          width: (index, bar) => bar.style.getPropertyValue('--target-width'),
          duration: 1.15,
          stagger: 0.08,
          ease: 'power3.out',
        },
        '-=0.18',
      )
  }, rootElement)

  // Remove animações e ScrollTriggers quando o componente desmontar.
  return () => context.revert()
}
