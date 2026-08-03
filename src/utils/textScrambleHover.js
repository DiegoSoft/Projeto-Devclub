import { gsap } from 'gsap'

// Caracteres usados durante o efeito scramble.
// Mantemos símbolos técnicos para combinar com a estética de tecnologia da página.
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_#$%{}[]'

// Retorna um caractere aleatório da lista acima.
function getRandomScrambleChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
}

// Aplica o efeito scramble em um elemento de texto, ouvindo hover/focus em um elemento gatilho.
function bindScrambleElement(textElement, triggerElement = textElement) {
  // Evita registrar o mesmo efeito duas vezes no mesmo elemento.
  if (!textElement || textElement.dataset.scrambleBound === 'true') return () => undefined

  // Guarda o texto original para restaurar depois da animação.
  const originalText = textElement.dataset.scrambleText || textElement.textContent || ''
  textElement.dataset.scrambleText = originalText
  textElement.dataset.scrambleBound = 'true'

  let activeTween

  // Recria o texto misturando caracteres aleatórios e revelando o original progressivamente.
  const renderScrambledText = (progress) => {
    const revealedCharacters = Math.floor(originalText.length * progress)

    textElement.textContent = originalText
      .split('')
      .map((character, index) => {
        if (character === ' ') return ' '
        if (index < revealedCharacters) return character
        return getRandomScrambleChar()
      })
      .join('')
  }

  // Executa o scramble no hover/focus e termina sempre voltando para o texto original.
  const playScramble = () => {
    activeTween?.kill()

    const scrambleState = { progress: 0 }

    activeTween = gsap.to(scrambleState, {
      progress: 1,
      duration: 0.9,
      ease: 'steps(14)',
      onStart: () => renderScrambledText(0),
      onUpdate: () => renderScrambledText(scrambleState.progress),
      onComplete: () => {
        textElement.textContent = originalText
      },
    })
  }

  // Ao sair do elemento, garantimos que o texto não fique preso em caracteres aleatórios.
  const resetScramble = () => {
    activeTween?.kill()
    textElement.textContent = originalText
  }

  triggerElement.addEventListener('pointerenter', playScramble)
  triggerElement.addEventListener('mouseenter', playScramble)
  triggerElement.addEventListener('mouseover', playScramble)
  triggerElement.addEventListener('focus', playScramble)
  triggerElement.addEventListener('pointerleave', resetScramble)
  triggerElement.addEventListener('mouseleave', resetScramble)
  triggerElement.addEventListener('blur', resetScramble)

  // Função de limpeza usada pelo React quando o componente desmonta.
  return () => {
    activeTween?.kill()
    textElement.textContent = originalText
    textElement.dataset.scrambleBound = 'false'
    triggerElement.removeEventListener('pointerenter', playScramble)
    triggerElement.removeEventListener('mouseenter', playScramble)
    triggerElement.removeEventListener('mouseover', playScramble)
    triggerElement.removeEventListener('focus', playScramble)
    triggerElement.removeEventListener('pointerleave', resetScramble)
    triggerElement.removeEventListener('mouseleave', resetScramble)
    triggerElement.removeEventListener('blur', resetScramble)
  }
}

export function initTextScrambleHover(rootElement) {
  const root = rootElement || document
  const cleanups = []

  // Se o próprio elemento recebido tem a classe, ele também recebe o efeito.
  if (root.matches?.('.text-scramble')) {
    cleanups.push(bindScrambleElement(root, root))
  }

  // Busca todos os textos marcados para receber scramble dentro do escopo informado.
  Array.from(root.querySelectorAll?.('.text-scramble') || []).forEach((textElement) => {
    const triggerElement = textElement.closest('a, button') || textElement
    cleanups.push(bindScrambleElement(textElement, triggerElement))
  })

  return () => {
    cleanups.forEach((cleanup) => cleanup())
  }
}
