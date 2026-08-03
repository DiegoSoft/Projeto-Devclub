import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Registra o plugin responsável por reagir ao scroll da página.
gsap.registerPlugin(ScrollTrigger)

export function initNavbar() {
  // Seleciona os elementos do navbar que serão animados ou observados.
  const desktopNavContainer = document.querySelector('.desktop-nav')
  const activeNavIndicator = document.getElementById('nav-active-indicator')
  const desktopNavLinkElements = Array.from(document.querySelectorAll('.nav-link'))

  // Se algum elemento essencial não existir, a função termina sem quebrar a aplicação.
  if (!desktopNavContainer || !activeNavIndicator || desktopNavLinkElements.length === 0) {
    return undefined
  }

  // Mapa que relaciona cada href do menu com seu respectivo link.
  const sectionToNavLinkMap = new Map()

  desktopNavLinkElements.forEach((navLink) => {
    const targetHref = navLink.getAttribute('href')
    if (targetHref) sectionToNavLinkMap.set(targetHref, navLink)
  })

  // Move a linha ativa para baixo do link correspondente à seção visível.
  const updateActiveIndicatorPosition = (targetNavLink) => {
    if (!targetNavLink) {
      gsap.to(activeNavIndicator, {
        autoAlpha: 0,
        duration: 0.25,
        ease: 'power2.out',
      })
      desktopNavLinkElements.forEach((navLink) => navLink.classList.remove('is-active'))
      return
    }

    const navRect = desktopNavContainer.getBoundingClientRect()
    const targetRect = targetNavLink.getBoundingClientRect()

    gsap.to(activeNavIndicator, {
      autoAlpha: 1,
      x: targetRect.left - navRect.left,
      width: targetRect.width,
      duration: 0.38,
      ease: 'power3.out',
      overwrite: 'auto',
    })

    desktopNavLinkElements.forEach((navLink) => {
      navLink.classList.toggle('is-active', navLink === targetNavLink)
    })
  }

  // Cria ScrollTriggers para detectar qual seção está ativa durante o scroll.
  const triggers = ['#hero', '#about', '#formacoes', '#depoimentos', '#gallery', '#reserve']
    .map((sectionSelectorId) => {
      const sectionElement = document.querySelector(sectionSelectorId)
      if (!sectionElement) return null

      return ScrollTrigger.create({
        trigger: sectionElement,
        start: sectionSelectorId === '#hero' ? 'top top' : 'top 40%',
        end: 'bottom 40%',
        onToggle: (scrollTriggerInstance) => {
          if (!scrollTriggerInstance.isActive) return
          const activeNavLink = sectionToNavLinkMap.get(sectionSelectorId) || null
          updateActiveIndicatorPosition(activeNavLink)
        },
      })
    })
    .filter(Boolean)

  // Define o estado inicial do menu.
  // Se a página estiver no topo, Home sempre vence, mesmo que a URL tenha ficado com #login de uma navegação anterior.
  requestAnimationFrame(() => {
    const heroNavLink = sectionToNavLinkMap.get('#hero')
    const currentHash = window.location.hash
    const currentHashElement = currentHash ? document.querySelector(currentHash) : null
    const currentHashNavLink = currentHashElement ? sectionToNavLinkMap.get(currentHash) : null
    const shouldForceHome = window.scrollY < 20 || !currentHashElement

    updateActiveIndicatorPosition(shouldForceHome ? heroNavLink : currentHashNavLink || heroNavLink || null)
  })

  // Recalcula a posição do indicador quando a tela muda de tamanho.
  const handleResize = () => {
    const activeNavLink = desktopNavLinkElements.find((navLink) => navLink.classList.contains('is-active'))
    if (activeNavLink) updateActiveIndicatorPosition(activeNavLink)
  }

  window.addEventListener('resize', handleResize)

  // Limpa listeners e ScrollTriggers quando o componente desmontar.
  return () => {
    window.removeEventListener('resize', handleResize)
    triggers.forEach((trigger) => trigger.kill())
  }
}
