import { useEffect, useRef } from 'react'
import '../styles/faq.css'
import { initFaq } from '../scripts/faq'

// Lista centralizada de perguntas e respostas.
// Assim fica fácil adicionar, remover ou alterar qualquer item sem mexer na estrutura visual.
const faqItems = [
  {
    question: 'É para iniciante ou precisa de repertório?',
    answer:
      'É para quem quer evoluir com direção. O conteúdo pode guiar iniciantes desde a base e também ajudar quem já sabe um pouco a organizar melhor sua jornada.',
  },
  {
    question: 'Eu já trabalho como programador, esse curso vale a pena para mim?',
    answer:
      'Sim. A proposta não é apenas ensinar sintaxe, mas acelerar repertório, projetos, carreira, IA, mercado e tomada de decisão técnica.',
  },
  {
    question: 'Eu já trabalho como designer, esse curso vale a pena para mim?',
    answer:
      'Vale bastante. Designer com visão de tecnologia consegue dialogar melhor com times, criar produtos mais completos e abrir novas oportunidades.',
  },
  {
    question: 'Eu tenho que saber programar?',
    answer:
      'Não precisa começar sabendo. A trilha foi pensada para construir base, prática e confiança progressivamente.',
  },
  {
    question: 'As aulas e formações já estão prontas?',
    answer:
      'A plataforma reúne formações, aulas, comunidade, suporte e recursos para acompanhar o aluno durante a evolução.',
  },
  {
    question: 'O curso tem certificado?',
    answer:
      'Sim, a ideia é que o aluno possa comprovar sua evolução e fortalecer seu portfólio profissional.',
  },
  {
    question: 'Até quando posso me inscrever?',
    answer:
      'As condições podem mudar conforme campanha, turma ou disponibilidade. O ideal é garantir a inscrição quando a oportunidade estiver aberta.',
  },
  {
    question: 'Dá para parcelar no boleto?',
    answer:
      'As opções de pagamento dependem da oferta ativa. O suporte pode orientar a melhor forma disponível no momento.',
  },
]

function Faq() {
  // Referência da seção inteira para escopar a animação e o acordeão apenas neste componente.
  const sectionRef = useRef(null)

  // Inicializa entrada da seção e comportamento de abrir/fechar perguntas.
  useEffect(() => initFaq(sectionRef.current), [])

  return (
    <section className="faq-section" id="faq" ref={sectionRef}>
      {/* Luzes de fundo discretas para manter a seção conectada ao visual da landing. */}
      <div className="faq-glow is-mint" aria-hidden="true" />
      <div className="faq-glow is-purple" aria-hidden="true" />

      <div className="faq-container">
        {/* Coluna esquerda: título e card de suporte, como na referência. */}
        <aside className="faq-aside">
          <div className="faq-heading">
            <span className="faq-pill">FAQ ✦</span>
            <h2>Perguntas frequentes</h2>
          </div>

          {/* Card de ajuda para direcionar o usuário caso ainda tenha dúvidas. */}
          <div className="faq-support-card">
            <div className="faq-support-avatar" aria-hidden="true">
              ?
            </div>
            <p>Se ainda estiver com dúvidas, nossa equipe está à disposição.</p>
            <a href="#contato" className="faq-support-button">
              Falar com o suporte
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>

        {/* Coluna direita: acordeão com perguntas abertas por clique. */}
        <div className="faq-list" aria-label="Perguntas frequentes sobre a formação">
          {faqItems.map((item, index) => (
            <article className="faq-item" data-faq-item key={item.question}>
              <button
                className="faq-question"
                type="button"
                data-faq-question
                aria-expanded="false"
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>
                <i aria-hidden="true">+</i>
              </button>

              <div className="faq-answer" id={`faq-answer-${index}`} data-faq-answer>
                <p>{item.answer}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq
