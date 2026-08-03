import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger para conectar o zoom e o stacking ao scroll da página.
gsap.registerPlugin(ScrollTrigger)

export function initPlataforma(rootElement) {
  // Garante que o script só execute quando a seção já existe no DOM.
  if (!rootElement) return () => undefined

  // Lista de limpezas manuais do deck, usada para remover eventos no final.
  const deckCleanups = []

  // Contexto GSAP: mantém seletores limitados ao componente e limpa tudo ao desmontar.
  const context = gsap.context(() => {
    // Prepara elementos para animações com melhor performance.
    gsap.set(['.plataforma-header', '.plataforma-showcase', '.plataforma-preview-card', '.plataforma-feature-card'], {
      willChange: 'transform, opacity, filter',
      force3D: true,
    })

    // Entrada principal do cabeçalho.
    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    })

    entranceTimeline.from('.plataforma-header', {
      y: 24,
      autoAlpha: 0,
      filter: 'blur(10px)',
      duration: 0.75,
    })

    // Entrada do showcase sem aplicar transform no pai: isso preserva o funcionamento do position: sticky.
    gsap.from('.plataforma-showcase', {
      y: 48,
      autoAlpha: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    // Contra-zoom suave na imagem da plataforma para dar profundidade visual.
    gsap.fromTo(
      '.plataforma-image-mask img',
      { scale: 1.16 },
      {
        scale: 1.02,
        ease: 'none',
        scrollTrigger: {
          trigger: rootElement,
          start: 'top 88%',
          end: 'center 38%',
          scrub: true,
        },
      },
    )

    // Card Deck Toss: cards agrupados, clique no topo joga o card para o lado e revela o próximo.
    const deckCards = gsap.utils.toArray('[data-stack-card]')
    let deckOrder = [...deckCards]
    let isAnimatingDeck = false

    const renderDeck = (animate = true) => {
      deckOrder.forEach((card, index) => {
        const depth = Math.min(index, 4)
        const isActive = index === 0

        card.classList.toggle('is-active', isActive)
        card.classList.toggle('is-back-card', !isActive)
        card.style.setProperty('--stack-index', index)

        gsap.to(card, {
          x: depth * -7,
          y: '-50%',
          marginTop: depth * -14,
          scale: 1 - depth * 0.035,
          rotate: index % 2 === 0 ? -depth * 0.9 : depth * 0.9,
          autoAlpha: index > 4 ? 0 : 1,
          zIndex: 30 - index,
          filter: index > 0 ? 'brightness(0.82)' : 'brightness(1)',
          duration: animate ? 0.42 : 0,
          ease: 'power3.out',
          overwrite: true,
        })
      })
    }

    const tossTopCard = (direction = 1) => {
      if (isAnimatingDeck || deckOrder.length === 0) return

      isAnimatingDeck = true
      const topCard = deckOrder[0]

      gsap.to(topCard, {
        x: direction * 430,
        y: '-64%',
        rotate: direction * 18,
        autoAlpha: 0,
        duration: 0.52,
        ease: 'power3.in',
        overwrite: true,
        onComplete: () => {
          deckOrder = [...deckOrder.slice(1), topCard]
          gsap.set(topCard, { x: 0, y: '-50%', rotate: 0, autoAlpha: 0 })
          renderDeck(true)
          isAnimatingDeck = false
        },
      })
    }

    deckCards.forEach((card) => {
      const handleClick = () => {
        if (deckOrder[0] !== card) return
        tossTopCard(1)
      }

      card.addEventListener('click', handleClick)
      deckCleanups.push(() => card.removeEventListener('click', handleClick))
    })

    gsap.from(deckCards, {
      y: '-40%',
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.58,
      stagger: 0.05,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 58%',
        toggleActions: 'play none none reverse',
      },
      onComplete: () => renderDeck(true),
    })

    renderDeck(false)

    gsap.to('.plataforma-floating-badge', {
      y: -8,
      duration: 2.4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.18,
    })
  }, rootElement)

  return () => {
    deckCleanups.forEach((cleanup) => cleanup())
    context.revert()
  }
}
