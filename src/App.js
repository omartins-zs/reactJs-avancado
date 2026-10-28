import React, {
  Component,
  Fragment,
  createContext,
  memo,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import './App.css'

export const DEMO_USERS = [
  {
    id: 1,
    name: 'Administrador DIO',
    email: 'admin@reactjs.com',
    password: 'Password@123',
    role: 'Administrador',
    permissions: 'Acesso Total + Telemetria + Laboratórios',
  },
  {
    id: 2,
    name: 'Bruno Carneiro (Instrutor)',
    email: 'instrutor@reactjs.com',
    password: 'Password@123',
    role: 'Instrutor',
    permissions: 'Modo Aula + Inspeção de Ciclo de Vida',
  },
  {
    id: 3,
    name: 'Gabriel Martins (Aluno)',
    email: 'aluno@reactjs.com',
    password: 'Password@123',
    role: 'Aluno',
    permissions: 'Execução dos 10 Laboratórios Práticos',
  },
]

export const MODULES = [
  {
    id: 'overview',
    lesson: 'Painel Principal',
    title: 'Visão Geral do Curso',
    folder: './',
    description: 'Resumo interativo das 3 aulas e dos 10 módulos práticos de ReactJS Avançado.',
  },
  {
    id: 'life-cycle',
    lesson: 'Aula 1',
    title: '1. Ciclo de Vida (Life Cycle)',
    folder: './life-cycle',
    description: 'Gerenciamento de montagem, atualização, shouldComponentUpdate e desmontagem em Class Components.',
  },
  {
    id: 'hooks',
    lesson: 'Aula 1',
    title: '2. React Hooks & Memo',
    folder: './hooks',
    description: 'Uso de useState, useEffect e React.memo (areEqual) para controle fino de re-renderizações.',
  },
  {
    id: 'context-api',
    lesson: 'Aula 1',
    title: '3. Context API',
    folder: './context-api',
    description: 'Compartilhamento global de Tema e Token de autenticação sem Prop Drilling.',
  },
  {
    id: 'fragments',
    lesson: 'Aula 2',
    title: '4. Fragments',
    folder: './fragments',
    description: 'Agrupamento de elementos adjacentes em tabelas sem criar nós extras na árvore DOM.',
  },
  {
    id: 'error-boundaries',
    lesson: 'Aula 2',
    title: '5. Error Boundaries',
    folder: './error-boundaries',
    description: 'Captura declarativa de erros em componentes filhos com componentDidCatch e UI de Fallback.',
  },
  {
    id: 'render-props',
    lesson: 'Aula 2',
    title: '6. Render Props',
    folder: './render-props',
    description: 'Reutilização de lógica de estado entre componentes através de uma função passada via prop render.',
  },
  {
    id: 'type-checking',
    lesson: 'Aula 2',
    title: '7. Type Checking (PropTypes)',
    folder: './type-checking',
    description: 'Validação de propriedades obrigatórias, tipos primitivos, listas e valores padrão (defaultProps).',
  },
  {
    id: 'refs-dom',
    lesson: 'Aula 2',
    title: '8. Refs & DOM',
    folder: './refs-dom',
    description: 'Acesso imperativo a elementos DOM e persistência mutável com useRef sem disparar novo render.',
  },
  {
    id: 'smart-dumb',
    lesson: 'Aula 3',
    title: '9. Dumb & Smart Components',
    folder: './dumb-components & ./smart-components',
    description: 'Separação entre componentes puramente apresentacionais (Calc, Button) e containers com estado (PhotosGallery).',
  },
  {
    id: 'structure-project',
    lesson: 'Aula 3',
    title: '10. Arquitetura & Structure Project',
    folder: './structure-project',
    description: 'Organização escalável em commons, components, containers, resources e routes com utilitários testáveis.',
  },
]

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
  token: null,
})

class SafeErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, errorMessage: '' }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message }
  }

  componentDidCatch(error, errorInfo) {
    if (this.props.onErrorLog) {
      this.props.onErrorLog(`ErrorBoundary capturou: ${error.message}`)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: '' })
    if (this.props.onReset) {
      this.props.onReset()
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-alert" style={{ padding: '20px' }}>
          <h4>Fallback UI Ativada pelo Error Boundary!</h4>
          <p style={{ margin: '8px 0 14px' }}>
            Motivo capturado: <strong>{this.state.errorMessage}</strong>
          </p>
          <button type="button" className="btn btn-primary" onClick={this.handleReset}>
            Restaurar Componente
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function BuggyWidget({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error('Falha simulada na renderização da coluna de produtos!')
  }
  return (
    <div className="feature-box">
      <p>Componente operando normalmente dentro do ErrorBoundary.</p>
    </div>
  )
}

class CounterRenderProps extends Component {
  state = { count: 0 }

  increment = () => this.setState((prev) => ({ count: prev.count + 1 }))
  decrement = () => this.setState((prev) => ({ count: prev.count - 1 }))
  reset = () => this.setState({ count: 0 })

  render() {
    return this.props.render({
      count: this.state.count,
      increment: this.increment,
      decrement: this.decrement,
      reset: this.reset,
    })
  }
}

const MemoizedTwitterHook = memo(
  function TwitterHook({ loading, posts, onLog }) {
    const [tweet, setTweet] = useState('Tweet inicial')

    useEffect(() => {
      onLog(`useEffect (mount): ${posts.length} posts carregados | loading=${loading}`)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
      onLog(`useEffect (update): status loading alterado para ${loading}`)
    }, [loading]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
      <div className="feature-box" style={{ marginTop: '12px' }}>
        <p>
          <strong>Estado Memoizado (Twitter.js):</strong> {tweet}
        </p>
        <p style={{ fontSize: '13px', margin: '6px 0 12px' }}>
          Prop <code>loading</code>: <strong>{loading ? 'Concluído (true)' : 'Carregando (false)'}</strong>
        </p>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const next = `Tweet atualizado às ${new Date().toLocaleTimeString()}`
            setTweet(next)
            onLog(`Estado local atualizado: ${next}`)
          }}
        >
          Atualizar Tweet (Re-render)
        </button>
      </div>
    )
  },
  (prevProps, nextProps) => prevProps.loading === nextProps.loading
)

function sanitizeString(str = '') {
  return String(str).trim().replace(/[^\w\sÀ-ÿ-]/gi, '')
}

function removeSpace(str = '') {
  return String(str).replace(/\s+/g, '')
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('reactjs_avancado_session')
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  })

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [activeModule, setActiveModule] = useState('overview')
  const [theme, setTheme] = useState('dark')
  const [logs, setLogs] = useState([
    'Sistema inicializado com sucesso.',
    'Todos os 10 módulos avançados carregados.',
  ])

  // Estados dos laboratórios
  const [lifecycleActive, setLifecycleActive] = useState(true)
  const [lifecycleLoading, setLifecycleLoading] = useState(false)
  const [contextToken, setContextToken] = useState('jwt-token-dio-9f8a7b6c')
  const [shouldCrashBoundary, setShouldCrashBoundary] = useState(false)
  const [petDogs, setPetDogs] = useState(2)
  const [petCats, setPetCats] = useState(1)
  const [petCustomer, setPetCustomer] = useState('Bruno Carneiro')
  const [petStatus, setPetStatus] = useState('Completed')
  const [calcMin, setCalcMin] = useState(10)
  const [calcMax, setCalcMax] = useState(30)
  const [calcInput, setCalcInput] = useState(5)
  const [galleryPhotos, setGalleryPhotos] = useState([
    { id: 1, title: 'Arquitetura React', category: 'Tech' },
    { id: 2, title: 'Componentes Puros', category: 'UI/UX' },
    { id: 3, title: 'Hooks Avançados', category: 'Performance' },
    { id: 4, title: 'Context API Global', category: 'State' },
  ])
  const [rawText, setRawText] = useState('  Curso Avançado de ReactJS @DIO! 2026  ')

  const domInputRef = useRef(null)
  const mutableCounterRef = useRef(1)
  const [, forceRefRender] = useState(0)

  const addLog = (message) => {
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${message}`, ...prev.slice(0, 19)])
  }

  const authenticate = (targetEmail, targetPassword) => {
    const found = DEMO_USERS.find(
      (u) =>
        u.email.toLowerCase() === String(targetEmail).trim().toLowerCase() &&
        u.password === targetPassword
    )
    if (!found) {
      setLoginError('Credenciais inválidas. Utilize um dos perfis de demonstração abaixo.')
      return
    }
    const sessionUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: found.role,
      permissions: found.permissions,
    }
    setUser(sessionUser)
    setLoginError('')
    try {
      localStorage.setItem('reactjs_avancado_session', JSON.stringify(sessionUser))
    } catch (e) {
      // ignore storage errors
    }
    addLog(`Sessão iniciada como ${found.name} (${found.role})`)
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    authenticate(email, password)
  }

  const handleQuickProfile = (demoUser) => {
    setEmail(demoUser.email)
    setPassword(demoUser.password)
    authenticate(demoUser.email, demoUser.password)
  }

  const handleLogout = () => {
    setUser(null)
    setEmail('')
    setPassword('')
    setActiveModule('overview')
    try {
      localStorage.removeItem('reactjs_avancado_session')
    } catch (e) {
      // ignore storage errors
    }
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  if (!user) {
    return (
      <div className="login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <span className="login-badge">Digital Innovation One • ReactJS</span>
            <h1>Portal ReactJS Avançado</h1>
            <p>Acesse o laboratório interativo com os 10 módulos de arquitetura e padrões React</p>
          </div>

          {loginError && (
            <div className="error-alert" role="alert">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">E-mail de acesso</label>
              <input
                id="login-email"
                type="email"
                className="form-input"
                placeholder="ex: admin@reactjs.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Senha</label>
              <input
                id="login-password"
                type="password"
                className="form-input"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Entrar na Plataforma
            </button>
          </form>

          <div className="quick-profiles">
            <h3>Acesso Rápido (Perfis de Demonstração — 1 Clique)</h3>
            <div className="profile-grid">
              {DEMO_USERS.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  className="profile-btn"
                  onClick={() => handleQuickProfile(profile)}
                >
                  <strong>{profile.role}</strong>
                  <span>{profile.email}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, token: contextToken }}>
      <div className={`app-shell ${theme === 'light' ? 'theme-light' : ''}`}>
        <header className="topbar">
          <div className="topbar-brand">
            <h2>⚛️ ReactJS Avançado — DIO</h2>
            <span className="user-pill">
              {user.name} • {user.role}
            </span>
          </div>

          <div className="topbar-actions">
            <button type="button" className="btn btn-secondary" onClick={toggleTheme}>
              Tema: {theme === 'dark' ? 'Escuro' : 'Claro'}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleLogout}>
              Sair
            </button>
          </div>
        </header>

        <div className="main-layout">
          <aside className="sidebar" aria-label="Menu de Módulos">
            <div className="nav-section-title">Navegação do Curso</div>
            {MODULES.map((mod) => (
              <button
                key={mod.id}
                type="button"
                className={`nav-item ${activeModule === mod.id ? 'active' : ''}`}
                onClick={() => setActiveModule(mod.id)}
              >
                <span>{mod.title}</span>
              </button>
            ))}
          </aside>

          <main className="content-area">
            {activeModule === 'overview' && (
              <div className="module-card">
                <div className="module-header">
                  <div>
                    <h2>Bem-vindo(a), {user.name}!</h2>
                    <p style={{ marginTop: '4px', opacity: 0.8 }}>
                      Permissões ativas: {user.permissions}
                    </p>
                  </div>
                </div>

                <div className="grid-cards">
                  {MODULES.filter((m) => m.id !== 'overview').map((mod) => (
                    <div key={mod.id} className="feature-box">
                      <span className="login-badge">{mod.lesson}</span>
                      <h3 style={{ fontSize: '16px', marginBottom: '6px' }}>{mod.title}</h3>
                      <p style={{ fontSize: '13px', opacity: 0.85, marginBottom: '12px' }}>
                        {mod.description}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <code style={{ fontSize: '11px' }}>{mod.folder}</code>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setActiveModule(mod.id)}
                        >
                          Abrir Módulo
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeModule === 'life-cycle' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>1. Ciclo de Vida (Life Cycle) — ./life-cycle</h2>
                </div>
                <p>
                  Simulação dos métodos <code>componentDidMount</code>, <code>componentDidUpdate</code>,{' '}
                  <code>shouldComponentUpdate</code> e <code>componentWillUnmount</code>.
                </p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      const next = !lifecycleLoading
                      setLifecycleLoading(next)
                      addLog(`componentDidUpdate: prop loading alterada para ${next}`)
                    }}
                  >
                    Alternar Loading ({lifecycleLoading ? 'Ativo' : 'Inativo'})
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      const next = !lifecycleActive
                      setLifecycleActive(next)
                      addLog(
                        next
                          ? 'componentDidMount: Componente Twitter montado'
                          : 'componentWillUnmount: Componente Twitter removido :('
                      )
                    }}
                  >
                    {lifecycleActive ? 'Remover Componente (Unmount)' : 'Montar Componente (Mount)'}
                  </button>
                </div>
                {lifecycleActive && (
                  <div className="feature-box" style={{ marginTop: '16px' }}>
                    <strong>Componente Twitter.js Montado</strong>
                    <p style={{ fontSize: '13px', marginTop: '6px' }}>
                      Status de carregamento atual: <code>{String(lifecycleLoading)}</code>
                    </p>
                  </div>
                )}
              </div>
            )}

            {activeModule === 'hooks' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>2. React Hooks & Memo — ./hooks</h2>
                </div>
                <p>
                  Demonstração de <code>useState</code>, <code>useEffect</code> e memorização com{' '}
                  <code>React.memo(Twitter, areEqual)</code>.
                </p>
                <div style={{ marginTop: '14px' }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setLifecycleLoading((prev) => !prev)}
                  >
                    Inverter prop loading ({String(lifecycleLoading)})
                  </button>
                </div>
                <MemoizedTwitterHook
                  loading={lifecycleLoading}
                  posts={[
                    { title: 'React Hooks', description: 'Substituindo classes com funções' },
                    { title: 'React.memo', description: 'Evitando re-renderizações desnecessárias' },
                  ]}
                  onLog={addLog}
                />
              </div>
            )}

            {activeModule === 'context-api' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>3. Context API — ./context-api</h2>
                </div>
                <p>
                  Provedor <code>ThemeContext.Provider</code> fornecendo token de sessão e tema para{' '}
                  <code>Card.js</code> e <code>Form.js</code>.
                </p>
                <div style={{ display: 'flex', gap: '10px', margin: '16px 0', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      setContextToken((prev) => (prev ? '' : '34q4m4k3ak43ak4kak4'))
                    }
                  >
                    {contextToken ? 'Revogar Token do Contexto' : 'Gerar Token no Contexto'}
                  </button>
                </div>
                <ContextConsumerDemo />
              </div>
            )}

            {activeModule === 'fragments' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>4. Fragments — ./fragments</h2>
                </div>
                <p>
                  Renderização de múltiplas colunas (<code>&lt;tr&gt;&lt;td&gt;</code>) dentro de{' '}
                  <code>&lt;table&gt;&lt;tbody&gt;</code> utilizando <code>&lt;Fragment key=...&gt;</code>.
                </p>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Calçado</th>
                      <th>Vestuário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['Linha 1', 'Linha 2', 'Linha 3'].map((row, idx) => (
                      <Fragment key={`column-${idx}`}>
                        <tr>
                          <td>Tênis ({row})</td>
                          <td>Roupa ({row})</td>
                        </tr>
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeModule === 'error-boundaries' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>5. Error Boundaries — ./error-boundaries</h2>
                </div>
                <p>
                  Simule um erro em tempo de renderização para verificar a captura segura pelo{' '}
                  <code>ErrorBoundary</code> sem derrubar o portal.
                </p>
                <div style={{ margin: '16px 0' }}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setShouldCrashBoundary(true)}
                  >
                    Disparar Erro no Componente Filho
                  </button>
                </div>
                <SafeErrorBoundary
                  onErrorLog={addLog}
                  onReset={() => setShouldCrashBoundary(false)}
                >
                  <BuggyWidget shouldCrash={shouldCrashBoundary} />
                </SafeErrorBoundary>
              </div>
            )}

            {activeModule === 'render-props' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>6. Render Props — ./render-props</h2>
                </div>
                <p>
                  Componente <code>Counter</code> fornecendo estado e ações para qualquer interface via prop{' '}
                  <code>render</code>.
                </p>
                <CounterRenderProps
                  render={({ count, increment, decrement, reset }) => (
                    <div className="feature-box" style={{ marginTop: '14px' }}>
                      <h3>Valor atual: {count}</h3>
                      <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                        <button type="button" className="btn btn-primary" onClick={increment}>
                          Adicionar 1
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={decrement}>
                          Remover 1
                        </button>
                        <button type="button" className="btn btn-danger" onClick={reset}>
                          Zerar
                        </button>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}

            {activeModule === 'type-checking' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>7. Type Checking (PropTypes) — ./type-checking</h2>
                </div>
                <p>
                  Componente <code>PetShop</code> com validação de propriedades e <code>defaultProps</code>.
                </p>
                <div className="grid-cards">
                  <div className="feature-box">
                    <div className="form-group">
                      <label htmlFor="pet-customer">Nome do Cliente (string.isRequired)</label>
                      <input
                        id="pet-customer"
                        className="form-input"
                        value={petCustomer}
                        onChange={(e) => setPetCustomer(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pet-dogs">Quantidade de Dogs (number.isRequired)</label>
                      <input
                        id="pet-dogs"
                        type="number"
                        className="form-input"
                        value={petDogs}
                        onChange={(e) => setPetDogs(Number(e.target.value) || 0)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pet-cats">Quantidade de Cats (number)</label>
                      <input
                        id="pet-cats"
                        type="number"
                        className="form-input"
                        value={petCats}
                        onChange={(e) => setPetCats(Number(e.target.value) || 0)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pet-status">Status (oneOf: Completed | Disabled)</label>
                      <select
                        id="pet-status"
                        className="form-input"
                        value={petStatus}
                        onChange={(e) => setPetStatus(e.target.value)}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Disabled">Disabled</option>
                      </select>
                    </div>
                  </div>

                  <div className="feature-box">
                    <h3>Resumo PetShop</h3>
                    <p style={{ marginTop: '8px' }}>Dogs: <strong>{petDogs}</strong></p>
                    <p>Cats: <strong>{petCats}</strong></p>
                    <p>Cliente: <strong>{petCustomer}</strong></p>
                    <p>Status validado: <strong>{petStatus}</strong></p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{ marginTop: '14px' }}
                      onClick={() => addLog(`PetShop: Iniciando banho para ${petCustomer} (${petDogs} cães)`)}
                    >
                      Iniciar Banho
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'refs-dom' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>8. Refs & DOM — ./refs-dom</h2>
                </div>
                <p>
                  Uso de <code>useRef</code> para focar elementos DOM diretamente e manter estado mutável sem re-render.
                </p>
                <div className="feature-box" style={{ marginTop: '14px' }}>
                  <h3>Valor de count.current: {mutableCounterRef.current}</h3>
                  <div className="form-group" style={{ marginTop: '12px' }}>
                    <label htmlFor="ref-focus-input">Campo controlado por inputRef:</label>
                    <input
                      id="ref-focus-input"
                      ref={domInputRef}
                      className="form-input"
                      placeholder="Clique no botão Focar abaixo..."
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        if (domInputRef.current) {
                          domInputRef.current.focus()
                          addLog('Refs DOM: Foco aplicado ao input via inputRef.current.focus()')
                        }
                      }}
                    >
                      Focar Input
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => {
                        mutableCounterRef.current += 100
                        forceRefRender((n) => n + 1)
                        addLog(`Refs DOM: count.current atualizado para ${mutableCounterRef.current}`)
                      }}
                    >
                      Somar +100 ao Ref
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'smart-dumb' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>9. Dumb & Smart Components — ./dumb-components & ./smart-components</h2>
                </div>
                <div className="grid-cards">
                  <div className="feature-box">
                    <h3>Dumb Component: Calculadora</h3>
                    <p style={{ fontSize: '13px', margin: '6px 0 12px' }}>
                      Valor mínimo: <strong>{calcMin}</strong> | Valor máximo: <strong>{calcMax}</strong>
                    </p>
                    <div className="form-group">
                      <label htmlFor="calc-input">Valor adicional:</label>
                      <input
                        id="calc-input"
                        type="number"
                        className="form-input"
                        value={calcInput}
                        onChange={(e) => setCalcInput(Number(e.target.value) || 0)}
                      />
                    </div>
                    <p style={{ fontSize: '16px', fontWeight: 700, marginBottom: '10px' }}>
                      Valor calculado: {calcMin + calcMax + calcInput}
                    </p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setCalcMin((m) => m + 10)
                        setCalcMax((m) => m + 10)
                      }}
                    >
                      Incrementar Base (+10)
                    </button>
                  </div>

                  <div className="feature-box">
                    <h3>Smart Component: PhotosGallery</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                      {galleryPhotos.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px 10px',
                            border: '1px solid #334155',
                            borderRadius: '6px',
                          }}
                        >
                          <span>
                            <strong>{item.title}</strong> ({item.category})
                          </span>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              setGalleryPhotos((prev) => prev.filter((p) => p.id !== item.id))
                            }
                          >
                            Remover
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'structure-project' && (
              <div className="module-card">
                <div className="module-header">
                  <h2>10. Structure Project — ./structure-project</h2>
                </div>
                <p>
                  Demonstração dos utilitários <code>sanitizeString</code> e <code>removeSpace</code> em{' '}
                  <code>src/commons/utils/string.js</code>.
                </p>
                <div className="feature-box" style={{ marginTop: '14px' }}>
                  <div className="form-group">
                    <label htmlFor="raw-string-input">Texto de Entrada:</label>
                    <input
                      id="raw-string-input"
                      className="form-input"
                      value={rawText}
                      onChange={(e) => setRawText(e.target.value)}
                    />
                  </div>
                  <p>
                    <code>sanitizeString</code>: <strong>{sanitizeString(rawText)}</strong>
                  </p>
                  <p style={{ marginTop: '6px' }}>
                    <code>removeSpace</code>: <strong>{removeSpace(rawText)}</strong>
                  </p>
                </div>
              </div>
            )}

            <div className="module-card">
              <div className="module-header">
                <h3>Console de Telemetria e Ciclo de Vida</h3>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setLogs(['Console limpo pelo usuário.'])}
                >
                  Limpar Logs
                </button>
              </div>
              <div className="log-box">
                {logs.map((entry, idx) => (
                  <div key={`log-${idx}`}>{entry}</div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  )
}

function ContextConsumerDemo() {
  const { token } = useContext(ThemeContext)
  if (!token) {
    return (
      <div className="error-alert">
        É necessário realizar o login / gerar token no Contexto!
      </div>
    )
  }
  return (
    <div className="feature-box">
      <p style={{ marginBottom: '10px' }}>
        Token ativo no <code>ThemeContext</code>: <code>{token}</code>
      </p>
      <div className="grid-cards">
        <div className="form-group">
          <label>Nome:</label>
          <input className="form-input" defaultValue="Gabriel Martins" />
        </div>
        <div className="form-group">
          <label>E-mail:</label>
          <input className="form-input" defaultValue="gabriel@reactjs.com" />
        </div>
      </div>
    </div>
  )
}

export default App
