import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o ScrollTrigger para animar a seção quando ela entrar no viewport.
gsap.registerPlugin(ScrollTrigger)

export function initFaq(rootElement) {
  // Evita executar o script antes do componente existir no DOM.
  if (!rootElement) return () => undefined

  // Contexto GSAP: limita seletores ao FAQ e facilita a limpeza ao desmontar.
  const context = gsap.context(() => {
    const faqItems = gsap.utils.toArray('[data-faq-item]')
    const answers = gsap.utils.toArray('[data-faq-answer]')

    // Mantém todas as respostas fechadas no estado inicial.
    gsap.set(answers, {
      height: 0,
      autoAlpha: 0,
      overflow: 'hidden',
    })

    // Prepara os blocos para animações suaves.
    gsap.set(['.faq-heading', '.faq-support-card', faqItems], {
      willChange: 'transform, opacity, filter',
      force3D: true,
    })

    // Timeline de entrada: título, card de suporte e perguntas aparecem em sequência.
    const entranceTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: rootElement,
        start: 'top 76%',
        toggleActions: 'restart none restart reset',
      },
      defaults: { ease: 'power3.out' },
    })

    entranceTimeline
      .from('.faq-heading', {
        x: -32,
        autoAlpha: 0,
        filter: 'blur(10px)',
        duration: 0.72,
      })
      .from(
        '.faq-support-card',
        {
          y: 28,
          autoAlpha: 0,
          scale: 0.96,
          filter: 'blur(12px)',
          duration: 0.72,
        },
        '-=0.36',
      )
      .from(
        faqItems,
        {
          x: 34,
          autoAlpha: 0,
          filter: 'blur(10px)',
          duration: 0.58,
          stagger: 0.07,
          clearProps: 'filter',
        },
        '-=0.45',
      )

    // Fecha todos os itens, exceto o item recebido como exceção.
    const closeOtherItems = (currentItem) => {
      faqItems.forEach((item) => {
        if (item === currentItem) return

        const question = item.querySelector('[data-faq-question]')
        const answer = item.querySelector('[data-faq-answer]')
        const icon = question?.querySelector('i')

        item.classList.remove('is-open')
        question?.setAttribute('aria-expanded', 'false')

        gsap.to(answer, {
          height: 0,
          autoAlpha: 0,
          duration: 0.32,
          ease: 'power2.inOut',
          overwrite: true,
        })

        gsap.to(icon, {
          rotate: 0,
          duration: 0.24,
          ease: 'power2.out',
          overwrite: true,
        })
      })
    }

    // Alterna o item clicado entre aberto e fechado.
    const toggleItem = (item) => {
      const question = item.querySelector('[data-faq-question]')
      const answer = item.querySelector('[data-faq-answer]')
      const icon = question?.querySelector('i')
      const isOpen = item.classList.contains('is-open')

      if (isOpen) {
        item.classList.remove('is-open')
        question?.setAttribute('aria-expanded', 'false')

        gsap.to(answer, {
          height: 0,
          autoAlpha: 0,
          duration: 0.34,
          ease: 'power2.inOut',
          overwrite: true,
        })

        gsap.to(icon, {
          rotate: 0,
          duration: 0.24,
          ease: 'power2.out',
          overwrite: true,
        })

        return
      }

      closeOtherItems(item)
      item.classList.add('is-open')
      question?.setAttribute('aria-expanded', 'true')

      gsap.to(answer, {
        height: 'auto',
        autoAlpha: 1,
        duration: 0.42,
        ease: 'power2.inOut',
        overwrite: true,
      })

      gsap.to(icon, {
        rotate: 45,
        duration: 0.24,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    // Adiciona os eventos de clique em cada pergunta.
    faqItems.forEach((item) => {
      const question = item.querySelector('[data-faq-question]')
      const handleClick = () => toggleItem(item)

      question?.addEventListener('click', handleClick)
      item._faqCleanup = () => question?.removeEventListener('click', handleClick)
    })

    // Limpa os eventos manuais adicionados às perguntas.
    return () => faqItems.forEach((item) => item._faqCleanup?.())
  }, rootElement)

  // Remove animações e ScrollTriggers quando o componente desmontar.
  return () => context.revert()
}
