import { useEffect, useState } from 'react'
import Button from './Button'
import '../styles/navbar.css'
import { initNavbar } from '../scripts/navbar'
import { handleNavClick } from '../utils/navigateWithTransition'
import { initTextScrambleHover } from '../utils/textScrambleHover'
import ImgLogo from '../assets/logo.png'

// Links principais da navegação. Mantemos em array para evitar repetir JSX e facilitar manutenção.
const navLinks = [
  { href: '#hero', label: 'Home' },
  { href: '#about', label: 'Sobre' },
  { href: '#formacoes', label: 'Formações' },
  { href: '#depoimentos', label: 'Nossos Alunos' },
  { href: '#login', label: 'Login' },
]

function NavBar() {
  // Controla se o menu mobile está aberto ou fechado.
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Inicializa a lógica GSAP do navbar e o efeito Text Scramble nos links depois da renderização.
  useEffect(() => {
    const cleanupNavbar = initNavbar()
    const cleanupScramble = initTextScrambleHover(document.querySelector('.navbar-wrapper'))

    return () => {
      cleanupNavbar?.()
      cleanupScramble?.()
    }
  }, [])

  // Fecha o menu mobile. Usamos em botões, links e backdrop.
  const closeMenu = () => setIsMenuOpen(false)

  // Navega para a seção clicada e fecha o menu mobile quando o usuário escolhe um link.
  const handleMenuLinkClick = (event) => {
    handleNavClick(event)
    closeMenu()
  }

  return (
    <header className="navbar-wrapper">
      {/* Container visual do navbar com logo, links e CTA. */}
      <div className="navbar-container">
        {/* Logo da marca. Também funciona como link para voltar ao topo do Hero. */}
        <a className="brand-logo text-scramble-trigger" href="#hero" onClick={handleMenuLinkClick}>
          <span aria-hidden="true">
            <img src={ImgLogo} alt="" className="img_logo" />
          </span>
          <span className="brand-name text-scramble">DevClub</span>
        </a>

        {/* Navegação desktop. O indicador ativo é controlado pelo GSAP em navbar.js. */}
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <a key={link.href} className="nav-link text-scramble text-scramble-trigger" href={link.href} onClick={handleNavClick}>
              {link.label}
            </a>
          ))}
          <div id="nav-active-indicator" className="nav-active-indicator" />
        </nav>

        {/* Área direita do navbar: CTA no desktop e botão hamburguer no mobile. */}
        <div className="navbar-actions">
          <div className="desktop-cta">
            <Button href="#reserve" className="nav-cta" onClick={handleNavClick}>
              Começar minha jornada
            </Button>
          </div>

          {/* Botão que abre e fecha o menu mobile. */}
          <button
            className="mobile-toggle"
            type="button"
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Drawer lateral usado apenas em telas menores. */}
      <div className={`mobile-drawer ${isMenuOpen ? 'is-open' : ''}`}>
        <div className="mobile-drawer-header">
          <span className="drawer-brand">DevClub</span>
          <button className="mobile-close" type="button" onClick={closeMenu} aria-label="Fechar menu">
            &times;
          </button>
        </div>

        {/* Links do menu mobile. Ao clicar, o menu fecha automaticamente. */}
        <nav className="mobile-nav" aria-label="Navegação mobile">
          {navLinks.map((link) => (
            <a
              className="mobile-nav-link text-scramble text-scramble-trigger"
              key={link.href}
              href={link.href}
              onClick={handleMenuLinkClick}
            >
              {link.label}
            </a>
          ))}
          <a
            className="mobile-nav-link mobile-reservation text-scramble text-scramble-trigger"
            href="#reserve"
            onClick={handleMenuLinkClick}
          >
            Começar minha jornada
          </a>
        </nav>
      </div>

      {/* Backdrop escuro que fecha o drawer ao clicar fora do menu. */}
      {isMenuOpen && <button className="drawer-backdrop" type="button" aria-label="Fechar menu" onClick={closeMenu} />}
    </header>
  )
}

export default NavBar
