import { useEffect, useRef } from 'react'
import '../styles/depoimento.css'
import { initDepoimentosVideo } from '../scripts/depoimento'
import Video from '../assets/video_depoimneto.mp4'

function Depoimentos() {
  // Referência da seção inteira para escopar a animação do vídeo e do título.
  const sectionRef = useRef(null)

  // Inicializa a animação quando a seção entra no viewport e limpa tudo ao desmontar.
  useEffect(() => initDepoimentosVideo(sectionRef.current), [])

  return (
    <section className="depoimentos-section" id="depoimentos" ref={sectionRef}>
      {/* Luzes decorativas de fundo para manter a seção em harmonia com a página. */}
      <div className="depoimentos-glow is-mint" aria-hidden="true" />
      <div className="depoimentos-glow is-purple" aria-hidden="true" />

      <div className="depoimentos-container">
        {/* Cabeçalho da seção com a promessa social da comunidade. */}
        <header className="depoimentos-header">
          <h2 className="depoimentos-title">
            Milhares de vidas <span>TRANSFORMADAS dentro da nossa Comunidade</span>
          </h2>
        </header>

        {/* Card principal do vídeo de depoimento. */}
        <div className="depoimentos-showcase">
          <div className="depoimentos-video-card">
            <div className="depoimentos-video-mask">
              <video className="depoimentos-video" src={Video} controls playsInline preload="metadata" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Depoimentos
