import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra ScrollTrigger para conectar a animação do footer ao scroll.
gsap.registerPlugin(ScrollTrigger)

export function initFooter(rootElement) {
  // Evita executar animações antes do footer existir no DOM.
  if (!rootElement) return () => undefined

  // Contexto GSAP: escopa seletores ao footer e facilita limpeza no desmontar.
  const context = gsap.context(() => {
    // Prepara o painel e a palavra gigante para o efeito de revelação.
    gsap.set(['.footer-panel', '.footer-big-word'], {
      willChange: 'transform, opacity',
      force3D: true,
    })

    // Entrada inicial do painel: sobe como um telão quando o usuário chega ao footer.
    gsap.fromTo(
      '.footer-panel',
      { yPercent: 12, autoAlpha: 0.92 },
      {
        yPercent: 0,
        autoAlpha: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootElement,
          start: 'top 88%',
          end: 'top 34%',
          scrub: 0.8,
        },
      },
    )

    // Palavra DevClub: aparece por baixo do painel conforme a página chega ao final.
    gsap.fromTo(
      '.footer-big-word',
      { yPercent: 12, autoAlpha: 0.45, scale: 0.98 },
      {
        yPercent: 0,
        autoAlpha: 1,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: rootElement,
          start: 'top 72%',
          end: 'bottom bottom',
          scrub: 1,
        },
      },
    )

    // Pequena entrada dos grupos internos para dar acabamento ao painel.
    gsap.from(['.footer-brand', '.footer-actions', '.footer-social', '.footer-column', '.footer-bottom-card'], {
      y: 24,
      autoAlpha: 0,
      duration: 0.72,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.footer-panel',
        start: 'top 72%',
        toggleActions: 'restart none restart reset',
      },
    })
  }, rootElement)

  // Remove animações e ScrollTriggers quando o componente desmontar.
  return () => context.revert()
}
