import { useEffect, useRef } from 'react'
import Button from './Button'
import '../styles/footer.css'
import { initFooter } from '../scripts/footer'
import { handleNavClick } from '../utils/navigateWithTransition'
import { initTextScrambleHover } from '../utils/textScrambleHover'

// Links principais do footer.
// Mantemos em arrays para facilitar manutenção e aplicar o mesmo efeito hover em todos.
const footerColumns = [
  {
    title: 'Jornada',
    links: [
      { href: '#hero', label: 'Home' },
      { href: '#about', label: 'Sobre' },
      { href: '#formacoes', label: 'Formações' },
      { href: '#professores', label: 'Professores' },
    ],
  },
  {
    title: 'Experiência',
    links: [
      { href: '#projetos', label: 'Projetos' },
      { href: '#depoimentos', label: 'Nossos alunos' },
      { href: '#mercado', label: 'Mercado' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Comunidade',
    links: [
      { href: '#plataforma', label: 'Plataforma' },
      { href: '#contato', label: 'Suporte' },
      { href: '#reserve', label: 'Inscrição' },
    ],
  },
]

// Links sociais fictícios/estruturais para manter o layout pronto.
const socialLinks = [
  { href: '#instagram', label: 'Instagram' },
  { href: '#youtube', label: 'YouTube' },
  { href: '#linkedin', label: 'LinkedIn' },
]

function Footer() {
  // Referência do footer para escopar animações e efeito scramble.
  const footerRef = useRef(null)

  // Inicializa o efeito de telão com GSAP e o mesmo hover scramble usado no Navbar.
  useEffect(() => {
    const cleanupFooter = initFooter(footerRef.current)
    const cleanupScramble = initTextScrambleHover(footerRef.current)

    return () => {
      cleanupFooter?.()
      cleanupScramble?.()
    }
  }, [])

  return (
    <footer className="site-footer" id="contato" ref={footerRef}>
      {/* Palavra gigante revelada pelo scroll, substituindo "Skills" por "DevClub". */}
      <div className="footer-big-word" aria-hidden="true">
        DEVCLUB
      </div>

      {/* Painel principal do footer que sobe como um telão ao chegar no fim da página. */}
      <div className="footer-panel">
        <div className="footer-top">
          {/* Identidade principal do footer. */}
          <a className="footer-brand text-scramble-trigger" href="#hero" onClick={handleNavClick}>
            <span className="footer-brand-mark" aria-hidden="true">
              DC
            </span>
            <span className="text-scramble">DevClub</span>
          </a>

          {/* CTAs finais para incentivar a próxima ação do visitante. */}
          <div className="footer-actions">
            <Button href="#reserve" className="footer-cta" onClick={handleNavClick}>
              Quero ser aluno
            </Button>
            <a className="footer-login text-scramble text-scramble-trigger" href="#login" onClick={handleNavClick}>
              Área do aluno
            </a>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-content">
          {/* Links sociais com o mesmo efeito hover de texto. */}
          <nav className="footer-social" aria-label="Redes sociais">
            {socialLinks.map((link) => (
              <a className="text-scramble text-scramble-trigger" href={link.href} key={link.label} onClick={handleNavClick}>
                {link.label}
              </a>
            ))}
          </nav>

          {/* Colunas de navegação interna do site. */}
          <div className="footer-link-columns">
            {footerColumns.map((column) => (
              <nav className="footer-column" aria-label={column.title} key={column.title}>
                <h3>{column.title}</h3>
                {column.links.map((link) => (
                  <a className="text-scramble text-scramble-trigger" href={link.href} key={link.label} onClick={handleNavClick}>
                    {link.label}
                  </a>
                ))}
              </nav>
            ))}
          </div>
        </div>

        {/* Barra inferior com resumo da marca e pequenos highlights. */}
        <div className="footer-bottom-card">
          <span>Cursos DevClub</span>
          <div className="footer-mini-brands" aria-label="Áreas de aprendizado">
            <strong>Front-End</strong>
            <strong>Back-End</strong>
            <strong>Full Stack</strong>
            <strong>IA & Automações</strong>
          </div>
        </div>

        <p className="footer-copy">© 2026 DevClub. Página institucional criada para apresentação educacional.</p>
      </div>
    </footer>
  )
}

export default Footer
