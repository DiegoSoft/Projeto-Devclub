import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger para disparar a animação quando o vídeo entra na tela.
gsap.registerPlugin(ScrollTrigger)

export function initDepoimentosVideo(rootElement) {
  // Evita executar animações antes da seção existir no DOM.
  if (!rootElement) return () => undefined

  // Contexto GSAP: limita os seletores a este componente e facilita a limpeza.
  const context = gsap.context(() => {
    // Prepara título e card do vídeo para uma entrada suave e performática.
    gsap.set(['.depoimentos-title', '.depoimentos-video-card', '.depoimentos-video-mask'], {
      willChange: 'transform, opacity, filter',
      force3D: true,
    })

    // Timeline de entrada: aparece uma única vez quando a seção entra no viewport.
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 78%',
        toggleActions: 'restart none restart reset',
      },
      defaults: { ease: 'power3.out' },
    })

    // Primeiro entra o título, depois o card e por último o vídeo dentro da moldura.
    timeline
      .from('.depoimentos-title', { y: 26, autoAlpha: 0, filter: 'blur(10px)', duration: 0.75 })
      .from('.depoimentos-video-card', { y: 38, autoAlpha: 0, scale: 0.94, filter: 'blur(14px)', duration: 0.85 }, '-=0.32')
      .fromTo(
        '.depoimentos-video-mask',
        { y: 34, autoAlpha: 0, scale: 0.9, filter: 'blur(16px)' },
        { y: 0, autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.9 },
        '-=0.35',
      )
  }, rootElement)

  // Remove animações e ScrollTriggers ao desmontar o componente.
  return () => context.revert()
}
