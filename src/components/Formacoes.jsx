import { useEffect, useRef } from 'react'
import '../styles/formacoes.css'
import { initFormacoesTimeline } from '../scripts/formacoes'
import Button from './Button'

// Lista central das formações exibidas na timeline.
// Cada objeto controla o título, a categoria, a cor visual do card e a descrição curta.
const formacoes = [
  {
    name: 'Programação Front End',
    tag: 'Base visual',
    type: 'mint',
    description: 'HTML, CSS, JavaScript, React e construção de interfaces modernas.',
  },
  {
    name: 'Programação Back End',
    tag: 'Lógica e servidores',
    type: 'slate',
    description: 'APIs, Node, banco de dados, autenticação e arquitetura de aplicações.',
  },
  {
    name: 'Programação Full Stack',
    tag: 'Jornada completa',
    type: 'purple',
    description: 'Do front ao back, conectando interfaces, regras de negócio e deploy.',
  },
  {
    name: 'Programação Mobile',
    tag: 'Apps',
    type: 'slate',
    description: 'Criação de experiências mobile conectadas ao ecossistema moderno.',
  },
  {
    name: 'React',
    tag: 'Interface profissional',
    type: 'slate',
    description: 'Componentização, estado, efeitos, rotas e padrões usados no mercado.',
  },
  {
    name: 'Node',
    tag: 'Back-end moderno',
    type: 'mint',
    description: 'Servidores rápidos, APIs escaláveis e integração com bancos de dados.',
  },
  {
    name: 'JavaScript Completo',
    tag: 'Fundamento essencial',
    type: 'slate',
    description: 'A linguagem principal da web, do básico ao avançado.',
  },
  {
    name: 'HTML5',
    tag: 'Estrutura',
    type: 'slate',
    description: 'Semântica, acessibilidade e base sólida para qualquer interface.',
  },
  {
    name: 'CSS3',
    tag: 'Design no código',
    type: 'purple',
    description: 'Layouts responsivos, animações, responsividade e acabamento visual.',
  },
  {
    name: 'Gestor de IA',
    tag: 'Profissão do futuro',
    type: 'slate',
    description: 'Uso estratégico de IA para produtividade, operação e tomada de decisão.',
  },
  {
    name: 'IA e Automações',
    tag: 'Eficiência',
    type: 'mint',
    description: 'Automatização de tarefas, fluxos inteligentes e integração entre ferramentas.',
  },
  {
    name: 'Claude & ClaudeCode',
    tag: 'IA aplicada ao dev',
    type: 'slate',
    description: 'Uso de assistentes de IA para acelerar estudo, código e documentação.',
  },
  {
    name: 'Trilha N8N',
    tag: 'No-code automation',
    type: 'slate',
    description: 'Criação de automações conectando APIs, serviços e processos reais.',
  },
  {
    name: 'Análise de Dados',
    tag: 'Dados',
    type: 'purple',
    description: 'Leitura, organização e interpretação de dados para decisões melhores.',
  },
  {
    name: 'PowerBI',
    tag: 'Dashboards',
    type: 'slate',
    description: 'Visualização de dados e criação de relatórios para negócios.',
  },
]

// Ferramentas exibidas no bloco final de Formações.
// Cada item usa um logo SVG externo e mantém um fallback de texto caso a imagem não carregue.
const aiTools = [
  {
    name: 'OpenAI',
    fallback: 'AI',
    tone: 'openai',
    iconUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai-chatgpt/default.svg',
  },
  {
    name: 'Claude',
    fallback: 'C',
    tone: 'claude',
    iconUrl: 'https://cdn.simpleicons.org/claude/ffffff',
  },
  {
    name: 'Google Gemini',
    fallback: 'G',
    tone: 'gemini',
    iconUrl: 'https://cdn.simpleicons.org/googlegemini/ffffff',
  },
  {
    name: 'Meta AI',
    fallback: '∞',
    tone: 'meta',
    iconUrl: 'https://cdn.simpleicons.org/meta/ffffff',
  },
  {
    name: 'Perplexity',
    fallback: 'P',
    tone: 'perplexity',
    iconUrl: 'https://cdn.simpleicons.org/perplexity/ffffff',
  },
  {
    name: 'n8n',
    fallback: 'N8',
    tone: 'n8n',
    iconUrl: 'https://cdn.simpleicons.org/n8n/ffffff',
  },
  {
    name: 'Deepseek',
    fallback: 'dee',
    tone: 'meta',
    iconUrl: 'https://cdn.simpleicons.org/deepseek/ffffff',	
  },
  {
    name: 'GitHub Copilot',
    fallback: '</>',
    tone: 'copilot',
    iconUrl: 'https://cdn.simpleicons.org/githubcopilot/ffffff',
  },
]

// Tecnologias exibidas no fechamento da seção.
// As duas linhas criam a sensação de ecossistema completo: front-end, back-end, dados, IA e automação.
const techStackRows = [
  [
    { name: 'LangChain', iconUrl: 'https://cdn.simpleicons.org/langchain/1c9c75' },
    { name: 'Pandas', iconUrl: 'https://cdn.simpleicons.org/pandas/5f63b8' },
    { name: 'NumPy', iconUrl: 'https://cdn.simpleicons.org/numpy/4dabcf' },
    { name: 'Scikit-learn', iconUrl: 'https://cdn.simpleicons.org/scikitlearn/f7931e' },
    { name: 'Plotly', iconUrl: 'https://cdn.simpleicons.org/plotly/3f4f75' },
    { name: 'Seaborn', iconUrl: 'https://cdn.simpleicons.org/python/3776ab' },
    { name: 'Selenium', iconUrl: 'https://cdn.simpleicons.org/selenium/43b02a' },
    { name: 'OpenPyXL', iconUrl: 'https://cdn.simpleicons.org/python/ffd43b' },
    { name: 'OpenAI', iconUrl: 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons/openai-chatgpt/default.svg' },
  ],
  [
    { name: 'HTML5', iconUrl: 'https://cdn.simpleicons.org/html5/e34f26' },
    { name: 'CSS3', iconUrl: 'https://cdn.simpleicons.org/css3/1572b6' },
    { name: 'JavaScript', iconUrl: 'https://cdn.simpleicons.org/javascript/f7df1e' },
    { name: 'React', iconUrl: 'https://cdn.simpleicons.org/react/61dafb' },
    { name: 'Node.js', iconUrl: 'https://cdn.simpleicons.org/nodedotjs/5fa04e' },
    { name: 'SQL', iconUrl: 'https://cdn.simpleicons.org/sqlite/3f8fd2' },
    { name: 'PostgreSQL', iconUrl: 'https://cdn.simpleicons.org/postgresql/4169e1' },
    { name: 'Docker', iconUrl: 'https://cdn.simpleicons.org/docker/2496ed' },
    { name: 'Git', iconUrl: 'https://cdn.simpleicons.org/git/f05032' },
    { name: 'GitHub', iconUrl: 'https://cdn.simpleicons.org/github/ffffff' },
    { name: 'n8n', iconUrl: 'https://cdn.simpleicons.org/n8n/ea4b71' },
  ],
]

function Formacoes() {
  // Referência da seção inteira; ela permite que o script GSAP busque elementos apenas dentro deste componente.
  const sectionRef = useRef(null)

  // Inicializa as animações quando o componente entra na tela e limpa tudo quando ele for desmontado.
  useEffect(() => initFormacoesTimeline(sectionRef.current), [])

  return (
    <section className="formacoes-section" id="formacoes" ref={sectionRef}>
      {/* Palavra grande decorativa no fundo para dar profundidade sem atrapalhar a leitura. */}
      <div className="formacoes-bg-word" aria-hidden="true">
        Formações
      </div>

      {/* Container principal que limita a largura da seção e mantém o conteúdo alinhado ao restante da página. */}
      <div className="formacoes-container">
        <div className="formacoes-grid">
          {/* Coluna principal: apresenta o texto de abertura e a timeline das formações. */}
          <div className="formacoes-timeline-container">
            {/* Linha vertical da timeline; a linha verde interna é animada conforme o usuário rola a página. */}
            <div className="formacoes-spine" aria-hidden="true">
              <div className="formacoes-progress-line" />
            </div>

            {/* Cabeçalho da seção: explica rapidamente o propósito das formações. */}
            <header className="formacoes-header">
              <span className="formacoes-eyebrow">Trilhas completas</span>
              <h2 className="formacoes-title">
                Formações completas para aprender <span>do zero ao avançado</span>
              </h2>
              <p className="formacoes-intro">
                Uma rota de aprendizado para quem quer construir base, dominar ferramentas modernas
                e transformar conhecimento em projetos reais para o mercado.
              </p>
            </header>

            {/* Lista dinâmica: percorre o array de formações e cria um card para cada trilha. */}
            <div className="formacoes-list">
              {formacoes.map((formacao, index) => (
                <article className="formacoes-timeline-item" key={formacao.name}>
                  {/* Ponto visual da timeline; recebe destaque verde quando o card entra no scroll. */}
                  <span className="formacoes-dot" aria-hidden="true" />

                  {/* Número da etapa para reforçar a ideia de jornada organizada. */}
                  <span className="formacoes-step">{String(index + 1).padStart(2, '0')}</span>

                  {/* Card da formação; a classe is-mint/is-purple/is-slate muda a aparência visual. */}
                  <div className={`formacoes-card is-${formacao.type}`}>
                    <span className="formacoes-tag">{formacao.tag}</span>
                    <h3 className="formacoes-name">{formacao.name}</h3>
                    <p className="formacoes-description">{formacao.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Coluna lateral: resume a proposta da jornada e cria um bloco fixo mais institucional. */}
          <aside className="formacoes-aside">
            <div className="formacoes-panel">
              <span className="formacoes-panel-label">Mapa da jornada</span>
              <h3 className="formacoes-panel-title">Aprenda, pratique e evolua com direção</h3>
              <p className="formacoes-panel-text">
                A seção funciona como uma trilha visual: cada card representa uma competência que
                aproxima o aluno de projetos reais, autonomia técnica e oportunidades profissionais.
              </p>
            </div>

            {/* Métricas curtas para transformar a lista em uma mensagem mais fácil de memorizar. */}
            <div className="formacoes-mini-grid" aria-label="Resumo das formações">
              <div className="formacoes-mini-card">
                <strong>15+</strong>
                <span>formações e trilhas</span>
              </div>
              <div className="formacoes-mini-card">
                <strong>0 → Pro</strong>
                <span>do básico ao avançado</span>
              </div>
              <div className="formacoes-mini-card">
                <strong>IA</strong>
                <span>automações e produtividade</span>
              </div>
              <div className="formacoes-mini-card">
                <strong>Dados</strong>
                <span>análise e dashboards</span>
              </div>
            </div>
          </aside>
        </div>

        {/* Bloco final: reforça a parte moderna da formação com IA, automações e ferramentas reais. */}
        <section className="formacoes-ai-panel" aria-labelledby="formacoes-ai-title">
          {/* Luzes decorativas do card grande; ficam escondidas para leitores de tela. */}
          <div className="formacoes-ai-glow is-left" aria-hidden="true" />
          <div className="formacoes-ai-glow is-right" aria-hidden="true" />

          <div className="formacoes-ai-content">
            {/* Selo superior: antecipa o tema do bloco antes do título principal. */}
            <span className="formacoes-ai-badge">
              <span aria-hidden="true">▶</span>
              IA, automações e dados
            </span>

            {/* Título de impacto: conecta as formações técnicas com ferramentas atuais do mercado. */}
            <h3 className="formacoes-ai-title" id="formacoes-ai-title">
              Aprenda as usar tecnologia <span>como vantagem competitiva</span>
            </h3>

            {/* Logos das ferramentas: deixam o bloco mais reconhecível e próximo da referência visual. */}
            <div className="formacoes-ai-tools" aria-label="Ferramentas e temas presentes na jornada">
              {aiTools.map((tool) => (
                <div className={`formacoes-ai-tool is-${tool.tone}`} key={tool.name} title={tool.name}>
                  <img src={tool.iconUrl} alt={`${tool.name} logo`} loading="lazy" />
                  <span className="formacoes-ai-tool-fallback" aria-hidden="true">
                    {tool.fallback}
                  </span>
                </div>
              ))}
            </div>

            {/* Texto explicativo: resume por que o bloco existe dentro da seção Formações. */}
            <div className="formacoes-ai-copy">
              <p>
                Você não aprende apenas a escrever código: aprende a construir soluções, automatizar
                processos e usar IA para acelerar estudos, projetos e decisões.
              </p>
              <p>
                A proposta é sair do zero com base sólida e chegar em um nível onde tecnologia,
                criatividade e mercado trabalham juntos.
              </p>
            </div>

            {/* CTA final da seção: convida o visitante a continuar a jornada depois de ver as formações. */}
            <Button href="#login" className="formacoes-ai-cta">
              Quero fazer parte
            </Button>
          </div>
        </section>

        {/* Fechamento visual: mostra o ecossistema de ferramentas que o aluno encontra na jornada. */}
        <section className="formacoes-stack-panel" aria-label="Tecnologias ensinadas e usadas nos projetos">
          {/* Camadas de sombra nas laterais para o marquee parecer infinito. */}
          <div className="formacoes-stack-fade is-left" aria-hidden="true" />
          <div className="formacoes-stack-fade is-right" aria-hidden="true" />

          {/* Texto curto de contexto para explicar por que tantas ferramentas aparecem juntas. */}
          <div className="formacoes-stack-header">
            <span className="formacoes-stack-kicker">Stack de mercado</span>
            <p>Ferramentas reais para construir, automatizar, analisar dados e entregar projetos melhores.</p>
          </div>

          {/* Duas linhas animadas. A lista é duplicada para criar rolagem contínua sem cortes visuais. */}
          <div className="formacoes-stack-marquee">
            {techStackRows.map((row, rowIndex) => (
              <div
                className={`formacoes-stack-row ${rowIndex === 1 ? 'is-reverse' : ''}`}
                key={`tech-row-${rowIndex}`}
              >
                {[...row, ...row].map((tech, index) => (
                  <span className="formacoes-stack-chip" key={`${tech.name}-${rowIndex}-${index}`}>
                    <img src={tech.iconUrl} alt="" loading="lazy" aria-hidden="true" />
                    {tech.name}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  )
}

export default Formacoes
