import { useEffect, useRef } from 'react'
import '../styles/button.css'
import { initHoverButtons } from '../utils/hoverButton'
import { initTextScrambleHover } from '../utils/textScrambleHover'

function Button({
  // Define se o componente será renderizado como link <a> ou botão <button>.
  as = 'a',
  href,
  type = 'button',

  // Controla o estilo visual do botão: preenchido ou contornado.
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  // Referência do elemento real no DOM. O efeito hover com GSAP precisa acessar esse nó.
  const buttonRef = useRef(null)

  // Escolhe a tag HTML correta de acordo com a prop "as".
  const ButtonTag = as === 'button' ? 'button' : 'a'

  // Define a classe da variante visual usada no CSS.
  const variantClass = variant === 'outline' ? 'variant-outline' : 'variant-primary'

  // Junta as classes base, variante e classes extras recebidas pelo componente.
  const classes = ['hover-button', 'text-scramble-trigger', variantClass, className].filter(Boolean).join(' ')

  // Props compartilhadas entre <a> e <button>, evitando duplicação de código.
  const sharedProps = {
    ...props,
    className: classes,
    ref: buttonRef,
  }

  // Inicializa os efeitos do botão quando o componente monta.
  // O primeiro controla o círculo de hover; o segundo aplica o Text Scramble no texto interno.
  useEffect(() => {
    const cleanupHover = initHoverButtons(buttonRef.current)
    const cleanupScramble = initTextScrambleHover(buttonRef.current)

    return () => {
      cleanupHover?.()
      cleanupScramble?.()
    }
  }, [])

  // Renderização específica quando o componente precisa se comportar como botão.
  if (ButtonTag === 'button') {
    return (
      <button {...sharedProps} type={type}>
        {/* Camada decorativa usada para a animação circular no hover. */}
        <span className="hover-circle-wrapper" aria-hidden="true">
          <span className="hover-circle" />
        </span>
        <span className="button-content text-scramble">{children}</span>
      </button>
    )
  }

  // Renderização padrão como link, usada para navegação entre seções.
  return (
    <a {...sharedProps} href={href}>
      {/* Mesma camada decorativa do botão, reaproveitada também em links. */}
      <span className="hover-circle-wrapper" aria-hidden="true">
        <span className="hover-circle" />
      </span>
      <span className="button-content text-scramble">{children}</span>
    </a>
  )
}

export default Button
