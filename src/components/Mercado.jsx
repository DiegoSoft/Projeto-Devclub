import { useEffect, useRef } from 'react'
import '../styles/mercado.css'
import { initMercado } from '../scripts/mercado'

// Dados exibidos nas barras.
// Os valores funcionam como referência visual/estimativa para comunicar potencial de mercado.
const salaryLevels = [
  {
    level: 'Júnior',
    brazil: 'R$ 42.000/ano',
    international: 'US$ 28.000/ano',
    brazilPercent: 34,
    internationalPercent: 52,
  },
  {
    level: 'Pleno',
    brazil: 'R$ 84.000/ano',
    international: 'US$ 55.000/ano',
    brazilPercent: 58,
    internationalPercent: 76,
  },
  {
    level: 'Sênior',
    brazil: 'R$ 144.000/ano',
    international: 'US$ 95.000/ano',
    brazilPercent: 82,
    internationalPercent: 100,
  },
]

function Mercado() {
  // Referência da seção inteira para escopar a animação GSAP apenas dentro deste componente.
  const sectionRef = useRef(null)

  // Inicializa a animação das barras quando a seção entra na tela.
  useEffect(() => initMercado(sectionRef.current), [])

  return (
    <section className="mercado-section" id="mercado" ref={sectionRef}>
      {/* Container compacto para manter o bloco elegante e fácil de ler. */}
      <div className="mercado-container">
        {/* Cabeçalho direto: apresenta a pergunta principal do bloco. */}
        <header className="mercado-header">
          <span className="mercado-eyebrow">Potencial de carreira</span>
          <h2>O mercado paga bem?</h2>
          <p>
            Uma visão simples de como a evolução técnica pode ampliar oportunidades no Brasil e no
            mercado internacional.
          </p>
        </header>

        {/* Card principal com barras animadas de comparação salarial. */}
        <div className="mercado-card">
          <div className="mercado-card-top">
            <h3>Programação | Valores anuais estimados</h3>
            <span>Brasil x Internacional</span>
          </div>

          {/* Lista de níveis: cada linha compara Brasil e Internacional. */}
          <div className="mercado-bars" aria-label="Comparativo visual de remuneração por nível">
            {salaryLevels.map((item) => (
              <article className="mercado-row" data-mercado-row key={item.level}>
                <strong>{item.level}</strong>

                <div className="mercado-row-bars">
                  {/* Barra verde: representa Brasil. */}
                  <div className="mercado-bar-line">
                    <div
                      className="mercado-bar-fill is-brazil"
                      data-mercado-bar
                      style={{ '--target-width': `${item.brazilPercent}%` }}
                    />
                    <span>{item.brazil}</span>
                  </div>

                  {/* Barra vermelha: representa oportunidades internacionais. */}
                  <div className="mercado-bar-line">
                    <div
                      className="mercado-bar-fill is-international"
                      data-mercado-bar
                      style={{ '--target-width': `${item.internationalPercent}%` }}
                    />
                    <span>{item.international}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Legenda das cores para o usuário entender rapidamente a comparação. */}
          <div className="mercado-legend" aria-label="Legenda do gráfico">
            <span>
              <i className="is-brazil" /> Brasil
            </span>
            <span>
              <i className="is-international" /> Internacional
            </span>
          </div>

          <p className="mercado-note">
            *Valores ilustrativos para fins de apresentação visual. Pesquise médias atualizadas de
            salário antes de usar números oficiais.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mercado
