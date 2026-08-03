import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o plugin ScrollTrigger para conectar animações GSAP ao movimento de scroll da página.
gsap.registerPlugin(ScrollTrigger)

export function initFormacoesTimeline(rootElement) {
  // Garante que o script só execute quando a seção já existe no DOM.
  if (!rootElement) return () => undefined

  // Cria um contexto responsivo do GSAP para configurar animações diferentes em desktop e mobile.
  const mediaMatcher = gsap.matchMedia()

  // Busca os itens apenas dentro da seção Formações, evitando conflito com outros componentes da página.
  const timelineItems = Array.from(rootElement.querySelectorAll('.formacoes-timeline-item'))

  // Se não houver cards, encerramos a função sem criar animações desnecessárias.
  if (timelineItems.length === 0) return () => undefined

  // Primeiro e último item são usados para calcular onde a linha de progresso começa e termina.
  const firstItem = timelineItems[0]
  const lastItem = timelineItems[timelineItems.length - 1]
  const progressLine = rootElement.querySelector('.formacoes-progress-line')

  // Define regras responsivas para manter a animação bonita tanto no computador quanto no celular.
  mediaMatcher.add(
    {
      isDesktop: '(min-width: 768px)',
      isMobile: '(max-width: 767px)',
    },
    (context) => {
      const { isDesktop } = context.conditions

      // Prepara a linha verde para ser animada de cima para baixo com boa performance.
      gsap.set(progressLine, {
        willChange: 'transform',
        transformOrigin: 'top center',
        force3D: true,
      })

      // Prepara os cards para animações de movimento, opacidade e blur sem travar a interface.
      gsap.set(rootElement.querySelectorAll('.formacoes-card'), {
        willChange: 'transform, opacity, filter',
        force3D: true,
      })

      // Prepara o bloco final de IA para entrar com fade, escala leve e movimento vertical.
      gsap.set(rootElement.querySelector('.formacoes-ai-panel'), {
        willChange: 'transform, opacity, filter',
        force3D: true,
      })

      // Anima a linha vertical da timeline conforme o visitante avança pela seção.
      gsap.fromTo(
        progressLine,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootElement.querySelector('.formacoes-timeline-container'),
            start: () => `top+=${firstItem.offsetTop} 90%`,
            end: () => `top+=${lastItem.offsetTop} 55%`,
            scrub: isDesktop ? true : 0.2,
          },
        },
      )

      // Cria uma pequena timeline para cada formação: card entra, ponto acende e número ganha destaque.
      timelineItems.forEach((timelineItemElement) => {
        const cardElement = timelineItemElement.querySelector('.formacoes-card')
        const dotElement = timelineItemElement.querySelector('.formacoes-dot')
        const stepElement = timelineItemElement.querySelector('.formacoes-step')

        // No desktop o card vem um pouco mais da esquerda; no mobile o deslocamento é menor.
        const startX = isDesktop ? -90 : -36

        // Cada timeline é controlada pelo scroll do próprio item.
        const itemTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: timelineItemElement,
            start: 'top 90%',
            end: 'top 55%',
            scrub: isDesktop ? 1 : 0.2,
          },
        })

        // Entrada suave do card: aparece com movimento lateral, escala leve e blur inicial.
        if (cardElement) {
          itemTimeline.fromTo(
            cardElement,
            { opacity: 0, x: startX, scale: 0.92, filter: 'blur(8px)' },
            { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', ease: 'none', duration: 1 },
            0,
          )
        }

        // Destaque do ponto da timeline para indicar a etapa ativa da jornada.
        if (dotElement) {
          itemTimeline.fromTo(
            dotElement,
            {
              backgroundColor: '#131313',
              borderColor: 'rgba(114, 26, 231, 0.65)',
              boxShadow: '0 0 0px rgba(57, 211, 83, 0)',
            },
            {
              backgroundColor: '#39d353',
              borderColor: '#39d353',
              boxShadow: '0 0 16px rgba(57, 211, 83, 0.78)',
              ease: 'none',
              duration: 1,
            },
            0,
          )
        }

        // Aumenta a presença visual do número da etapa quando o card fica ativo.
        if (stepElement) {
          itemTimeline.fromTo(
            stepElement,
            { opacity: 0.35 },
            { opacity: 1, ease: 'none', duration: 1 },
            0,
          )
        }
      })

      // Anima o painel final quando ele entra no viewport, criando um fechamento mais impactante para a seção.
      gsap.fromTo(
        rootElement.querySelector('.formacoes-ai-panel'),
        { y: 56, autoAlpha: 0, scale: 0.96, filter: 'blur(14px)' },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootElement.querySelector('.formacoes-ai-panel'),
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      // Entrada em cascata dos ícones do painel, deixando o bloco mais dinâmico e memorável.
      gsap.fromTo(
        rootElement.querySelectorAll('.formacoes-ai-tool'),
        { y: 22, autoAlpha: 0, scale: 0.72, rotate: -8 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotate: 0,
          duration: 0.72,
          ease: 'back.out(1.8)',
          stagger: 0.07,
          scrollTrigger: {
            trigger: rootElement.querySelector('.formacoes-ai-panel'),
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        },
      )

      // Movimento sutil e contínuo nos ícones para manter o painel vivo depois da entrada.
      gsap.to(rootElement.querySelectorAll('.formacoes-ai-tool'), {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.12,
      })

      // Revela o painel de tecnologias no final, fechando a seção com uma entrada suave.
      gsap.fromTo(
        rootElement.querySelector('.formacoes-stack-panel'),
        { y: 42, autoAlpha: 0, filter: 'blur(10px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootElement.querySelector('.formacoes-stack-panel'),
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
  )

  // Limpa as animações e ScrollTriggers quando o componente desmontar, evitando efeitos duplicados.
  return () => mediaMatcher.revert()
}
