import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra ScrollTrigger para animar a entrada da seção quando ela entra no viewport.
gsap.registerPlugin(ScrollTrigger)

export function initProjetos(rootElement) {
  // Evita executar animações antes do componente existir no DOM.
  if (!rootElement) return () => undefined

  // Contexto GSAP: limita os seletores ao componente e facilita a limpeza.
  const context = gsap.context(() => {
    const cards = gsap.utils.toArray('[data-project-card]')
    const galleryElement = rootElement.querySelector('.projetos-wave-gallery')

    // Prepara os elementos para animações com melhor performance.
    gsap.set(['.projetos-header', '.projeto-card'], {
      willChange: 'transform, opacity',
      force3D: true,
    })

    // Entrada da seção: título aparece com blur leve e os cards entram em sequência.
    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    })

    entranceTimeline
      .from('.projetos-header', { y: 26, autoAlpha: 0, filter: 'blur(10px)', duration: 0.8 })
      .from(
        cards,
        {
          y: 42,
          autoAlpha: 0,
          rotateY: -12,
          duration: 0.72,
          stagger: 0.06,
          clearProps: 'filter',
          onComplete: () => gsap.set(cards, { clearProps: 'filter' }),
        },
        '-=0.35',
      )

    // Abre o card selecionado e estreita os vizinhos como uma onda visual.
    // Em desktop animamos as colunas; em tablet/mobile mantemos carrossel horizontal.
    const applyWave = (activeIndex) => {
      cards.forEach((card, index) => card.classList.toggle('is-project-active', index === activeIndex))

      if (window.matchMedia('(max-width: 1100px)').matches || !galleryElement) return

      const columns = cards.map((_, index) => {
        const distance = Math.abs(index - activeIndex)
        if (distance === 0) return '2.55fr'
        if (distance === 1) return '1.08fr'
        return '0.78fr'
      })

      gsap.to(galleryElement, {
        gridTemplateColumns: columns.join(' '),
        duration: 0.62,
        ease: 'power3.out',
        overwrite: true,
      })

      cards.forEach((card, index) => {
        const distance = Math.abs(index - activeIndex)
        const direction = index < activeIndex ? -1 : 1

        gsap.to(card, {
          scale: distance === 0 ? 1.012 : distance === 1 ? 1.006 : 1,
          y: distance === 0 ? -10 : distance === 1 ? -4 : 0,
          rotateY: distance === 0 ? 0 : direction * Math.min(distance * 5, 14),
          opacity: distance > 3 ? 0.78 : 1,
          zIndex: distance === 0 ? 4 : distance === 1 ? 3 : 2,
          duration: 0.55,
          ease: 'power3.out',
          overwrite: true,
        })
      })
    }

    // Retorna todos os cards ao estado inicial quando o mouse sai da galeria.
    const resetWave = () => {
      cards.forEach((card) => card.classList.remove('is-project-active'))

      if (window.matchMedia('(max-width: 1100px)').matches || !galleryElement) return

      gsap.to(galleryElement, {
        gridTemplateColumns: 'repeat(9, minmax(0, 1fr))',
        duration: 0.58,
        ease: 'power3.out',
        overwrite: true,
      })

      gsap.to(cards, {
        scale: 1,
        y: 0,
        rotateY: 0,
        opacity: 1,
        zIndex: 1,
        duration: 0.55,
        ease: 'power3.out',
        overwrite: true,
      })
    }

    // Eventos de interação: hover para desktop, click para desktop/mobile e focus para teclado.
    cards.forEach((card, index) => {
      const handleActive = () => applyWave(index)

      card.addEventListener('pointerenter', handleActive)
      card.addEventListener('click', handleActive)
      card.addEventListener('focus', handleActive)

      card._projetosCleanup = () => {
        card.removeEventListener('pointerenter', handleActive)
        card.removeEventListener('click', handleActive)
        card.removeEventListener('focus', handleActive)
      }
    })

    galleryElement?.addEventListener('pointerleave', resetWave)
    galleryElement?.addEventListener('blur', resetWave, true)

    // Limpeza dos eventos manuais adicionados aos cards.
    return () => {
      cards.forEach((card) => card._projetosCleanup?.())
      galleryElement?.removeEventListener('pointerleave', resetWave)
      galleryElement?.removeEventListener('blur', resetWave, true)
    }
  }, rootElement)

  // Remove animações e ScrollTriggers quando o componente desmontar.
  return () => context.revert()
}
