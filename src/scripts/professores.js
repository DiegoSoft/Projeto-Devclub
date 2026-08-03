import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger para disparar as animações conforme a seção entra no viewport.
gsap.registerPlugin(ScrollTrigger)

export function initProfessores(rootElement) {
  // Evita executar animações antes da seção existir no DOM.
  if (!rootElement) return () => undefined

  // Contexto GSAP: limita seletores ao componente e remove tudo corretamente no desmontar.
  const context = gsap.context(() => {
    const cards = gsap.utils.toArray('[data-professor-card]')
    const prevButton = rootElement.querySelector('[data-professor-prev]')
    const nextButton = rootElement.querySelector('[data-professor-next]')

    if (cards.length === 0) return undefined

    // Guarda qual professor está no centro do carrossel.
    let activeIndex = 0
    const totalCards = cards.length

    // Define o tamanho da órbita de acordo com a largura da tela.
    const getOrbitConfig = () => {
      const isMobile = window.matchMedia('(max-width: 680px)').matches
      const isTablet = window.matchMedia('(max-width: 980px)').matches

      return {
        radiusX: isMobile ? 148 : isTablet ? 230 : 360,
        radiusY: isMobile ? 38 : isTablet ? 62 : 88,
        centerScale: isMobile ? 0.92 : 1,
        sideScale: isMobile ? 0.64 : 0.72,
      }
    }

    // Calcula a menor distância circular entre dois índices.
    const getCircularDistance = (index, centerIndex) => {
      const rawDistance = Math.abs(index - centerIndex)
      return Math.min(rawDistance, totalCards - rawDistance)
    }

    // Posiciona todos os cards em uma órbita oval, trazendo o ativo para frente.
    const renderCarousel = (duration = 0.72) => {
      const { radiusX, radiusY, centerScale, sideScale } = getOrbitConfig()

      cards.forEach((card, index) => {
        const relativeIndex = index - activeIndex
        const angle = (relativeIndex / totalCards) * Math.PI * 2
        const normalizedDepth = (Math.cos(angle) + 1) / 2
        const distance = getCircularDistance(index, activeIndex)
        const isActive = index === activeIndex

        card.classList.toggle('is-active', isActive)

        gsap.to(card, {
          x: Math.sin(angle) * radiusX,
          y: Math.cos(angle) * radiusY,
          scale: isActive ? centerScale : sideScale + normalizedDepth * 0.16,
          rotateY: isActive ? 0 : Math.sin(angle) * -26,
          autoAlpha: distance > 3 ? 0.38 : isActive ? 1 : 0.72,
          zIndex: Math.round(normalizedDepth * 20) + (isActive ? 30 : 0),
          duration,
          ease: 'power3.inOut',
          overwrite: true,
        })
      })
    }

    // Move o carrossel para o próximo professor.
    const showNextProfessor = () => {
      activeIndex = (activeIndex + 1) % totalCards
      renderCarousel()
    }

    // Move o carrossel para o professor anterior.
    const showPreviousProfessor = () => {
      activeIndex = (activeIndex - 1 + totalCards) % totalCards
      renderCarousel()
    }

    // Prepara os elementos antes da entrada da seção.
    gsap.set(['.professores-header', '.professores-carousel'], {
      willChange: 'transform, opacity, filter',
      force3D: true,
    })

    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      transformPerspective: 1000,
      transformOrigin: 'center center',
      willChange: 'transform, opacity',
      force3D: true,
    })

    renderCarousel(0)

    // Timeline de entrada: cabeçalho aparece e o carrossel surge como uma peça central.
    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 76%',
        toggleActions: 'restart none restart reset',
        onEnter: () => renderCarousel(0.85),
        onEnterBack: () => renderCarousel(0.85),
      },
      defaults: { ease: 'power3.out' },
    })

    entranceTimeline
      .from('.professores-header', {
        y: 28,
        autoAlpha: 0,
        filter: 'blur(10px)',
        duration: 0.8,
      })
      .from(
        '.professores-carousel',
        {
          y: 52,
          autoAlpha: 0,
          scale: 0.92,
          filter: 'blur(14px)',
          duration: 0.95,
          clearProps: 'filter',
        },
        '-=0.3',
      )

    // Clicar em um card lateral traz esse professor para o centro.
    cards.forEach((card, index) => {
      const image = card.querySelector('img')

      const handleCardClick = () => {
        activeIndex = index
        renderCarousel()
      }

      const handleEnter = () => {
        gsap.to(image, {
          scale: 1.08,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      const handleLeave = () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.45,
          ease: 'power3.out',
          overwrite: true,
        })
      }

      card.addEventListener('click', handleCardClick)
      card.addEventListener('focus', handleCardClick)
      card.addEventListener('pointerenter', handleEnter)
      card.addEventListener('pointerleave', handleLeave)

      card._professoresCleanup = () => {
        card.removeEventListener('click', handleCardClick)
        card.removeEventListener('focus', handleCardClick)
        card.removeEventListener('pointerenter', handleEnter)
        card.removeEventListener('pointerleave', handleLeave)
      }
    })

    // Botões de navegação para controlar a rotação do carrossel.
    prevButton?.addEventListener('click', showPreviousProfessor)
    nextButton?.addEventListener('click', showNextProfessor)

    // Recalcula a órbita ao redimensionar a tela.
    const handleResize = () => renderCarousel(0.35)
    window.addEventListener('resize', handleResize)

    // Limpa eventos manuais adicionados ao componente.
    return () => {
      cards.forEach((card) => card._professoresCleanup?.())
      prevButton?.removeEventListener('click', showPreviousProfessor)
      nextButton?.removeEventListener('click', showNextProfessor)
      window.removeEventListener('resize', handleResize)
    }
  }, rootElement)

  // Remove animações e ScrollTriggers quando o componente desmontar.
  return () => context.revert()
}
