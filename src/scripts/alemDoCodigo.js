import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger para controlar animações quando a seção entra no viewport.
gsap.registerPlugin(ScrollTrigger)

export function initAlemDoCodigo(rootElement) {
  // Garante que a função só execute quando o componente já estiver renderizado no DOM.
  if (!rootElement) return () => undefined

  // Contexto do GSAP: limita seletores e facilita a limpeza das animações ao desmontar.
  const context = gsap.context(() => {
    const cards = gsap.utils.toArray('.alem-card')

    // Prepara elementos para animações de entrada com boa performance.
    gsap.set(['.alem-header', '.alem-card'], {
      willChange: 'transform, opacity, filter',
      force3D: true,
    })

    // Entrada do cabeçalho: aparece antes dos cards para guiar a leitura.
    gsap.from('.alem-header', {
      y: 28,
      autoAlpha: 0,
      filter: 'blur(10px)',
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })

    // Entrada dos cards: fade alternado da esquerda e da direita para deixar o grid mais marcante.
    // O deslocamento lateral muda por índice, criando o efeito "is-left / is-right" sem precisar adicionar classes extras no JSX.
    gsap.from(cards, {
      x: (index) => (index % 2 === 0 ? -86 : 86),
      y: 26,
      autoAlpha: 0,
      scale: 0.92,
      rotate: (index) => (index % 2 === 0 ? -2.5 : 2.5),
      filter: 'blur(14px)',
      duration: 0.101,
      stagger: {
        each: 0.11,
        from: 'start',
      },
      ease: 'power4.out',
      scrollTrigger: {
        trigger: rootElement.querySelector('.alem-cards-grid'),
        start: 'top 82%',
        toggleActions: 'play none none reverse',
      },
    })

    // Ícones entram com um pequeno "pop" depois do card, reforçando o acabamento visual.
    gsap.from('.alem-card-icon', {
      scale: 0.55,
      rotate: -10,
      autoAlpha: 0,
      duration: 0.55,
      stagger: 0.08,
      ease: 'back.out(1.8)',
      scrollTrigger: {
        trigger: rootElement.querySelector('.alem-cards-grid'),
        start: 'top 78%',
        toggleActions: 'play none none reverse',
      },
    })

    // Microinteração: cada card inclina suavemente quando o mouse se move sobre ela.
    cards.forEach((card) => {
      const handlePointerMove = (event) => {
        const rect = card.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        const rotateY = ((x / rect.width) - 0.5) * 5
        const rotateX = ((y / rect.height) - 0.5) * -5

        card.style.setProperty('--mouse-x', `${x}px`)
        card.style.setProperty('--mouse-y', `${y}px`)

        gsap.to(card, {
          rotateX,
          rotateY,
          y: -4,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      const handlePointerLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.45,
          ease: 'power2.out',
          overwrite: true,
        })
      }

      card.addEventListener('pointermove', handlePointerMove)
      card.addEventListener('pointerleave', handlePointerLeave)

      // Guarda a limpeza de cada card no próprio elemento para remover os eventos no final.
      card._alemCleanup = () => {
        card.removeEventListener('pointermove', handlePointerMove)
        card.removeEventListener('pointerleave', handlePointerLeave)
      }
    })

    // Parallax discreto nas linhas do fundo para dar movimento sem aumentar o tamanho da seção.
    gsap.to('.alem-bg-lines', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: rootElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })

    // Remove eventos manuais dos cards antes do contexto GSAP ser revertido.
    return () => {
      cards.forEach((card) => card._alemCleanup?.())
    }
  }, rootElement)

  // Remove animações, ScrollTriggers e listeners quando o componente desmontar.
  return () => context.revert()
}
