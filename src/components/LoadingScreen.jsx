import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from '../styles/LoadingScreen.module.css'

function LoadingScreen({ onComplete, duration = 2600 }) {
  // Referências dos elementos animados diretamente pelo GSAP.
  const screenRef = useRef(null)
  const spinnerRef = useRef(null)
  const ringARef = useRef(null)
  const ringBRef = useRef(null)
  const progressWrapRef = useRef(null)
  const progressBarRef = useRef(null)
  const percentRef = useRef(null)

  useLayoutEffect(() => {
    // O context limita as animações ao loading e facilita limpar tudo no desmontar.
    const context = gsap.context(() => {
      const progress = { currentPercent: 0 }

      // Timeline de entrada: primeiro aparece o spinner, depois a barra e a porcentagem.
      const revealTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

      revealTimeline
        .to(spinnerRef.current, { autoAlpha: 1, duration: 0.6 })
        .to(progressWrapRef.current, { autoAlpha: 1, duration: 0.5 }, '-=0.1')
        .to(percentRef.current, { autoAlpha: 1, duration: 0.3 }, '<')

      // Animação contínua dos dois anéis em direções opostas.
      gsap.to(ringARef.current, {
        rotation: 360,
        duration: 2.5,
        repeat: -1,
        ease: 'none',
      })
      gsap.to(ringBRef.current, {
        rotation: -360,
        duration: 3.5,
        repeat: -1,
        ease: 'none',
      })

      // Pulso suave do spinner para dar sensação de carregamento vivo.
      gsap.to(spinnerRef.current, {
        scale: 1.08,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      })

      // Atualiza visualmente a largura da barra e o texto percentual.
      const updateProgress = () => {
        const value = Math.round(progress.currentPercent)
        progressBarRef.current.style.width = `${value}%`
        percentRef.current.textContent = `${value}%`
      }

      // Progresso falso até 80%, criando expectativa enquanto a página prepara a entrada.
      const fillTween = gsap.to(progress, {
        currentPercent: 80,
        duration: 2,
        delay: revealTimeline.duration(),
        ease: 'power1.inOut',
        onUpdate: updateProgress,
      })

      // Depois do tempo mínimo, completa para 100%, dispara o Hero e remove o loading.
      gsap.delayedCall(duration / 1000, () => {
        fillTween.kill()
        gsap.to(progress, {
          currentPercent: 100,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: true,
          onUpdate: updateProgress,
          onComplete: () => {
            // Evento usado pelo Hero para iniciar a animação de entrada no momento certo.
            document.dispatchEvent(new CustomEvent('devclub:hero-entrance'))
            gsap.to(screenRef.current, {
              autoAlpha: 0,
              scale: 0.95,
              duration: 0.8,
              delay: 0.3,
              ease: 'power2.inOut',
              onComplete,
            })
          },
        })
      })
    }, screenRef)

    return () => context.revert()
  }, [duration, onComplete])

  return (
    <div ref={screenRef} className={styles.screen} role="status" aria-live="polite">
      <div className={styles.content}>
        {/* Spinner com dois anéis SVG girando em sentidos opostos. */}
        <div ref={spinnerRef} className={styles.spinner} aria-hidden="true">
          <div ref={ringARef} className={styles.ringA}>
            <svg viewBox="0 0 128 128" className={styles.svg}>
              <circle cx="64" cy="64" r="60.25" className={styles.track} />
              <path d="M 64 3.75 A 60.25 60.25 0 0 1 64 124.25" className={styles.mintArc} />
            </svg>
          </div>
          <div ref={ringBRef} className={styles.ringB}>
            <svg viewBox="0 0 104 104" className={styles.svg}>
              <circle cx="52" cy="52" r="48.25" className={styles.track} />
              <path d="M 52 3.75 A 48.25 48.25 0 0 0 52 100.25" className={styles.purpleArc} />
            </svg>
          </div>
        </div>

        {/* Barra e porcentagem do progresso do carregamento. */}
        <div ref={progressWrapRef} className={styles.progressWrap}>
          <div ref={progressBarRef} className={styles.progressBar} />
        </div>
        <p ref={percentRef} className={styles.percent}>
          0%
        </p>
      </div>
      <span className={styles.srOnly}>Carregando conteúdo</span>
    </div>
  )
}

export default LoadingScreen
