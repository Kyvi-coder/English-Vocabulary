import { useState } from 'react'
import AdminTopicsPage from './pages/admin/AdminTopicsPage'
import AdminVocabularyPage from './pages/admin/AdminVocabularyPage'
import LoginPage from './pages/login/LoginPage'
import RegisterPage from './pages/login/RegisterPage'
import './App.css'

type AppTab = 'login' | 'register' | 'topics' | 'vocabulary'

function App() {
  const [tab, setTab] = useState<AppTab>('vocabulary')

  return (
    <>
      <nav className="admin-nav">
        <button
          className={tab === 'login' ? 'active' : ''}
          onClick={() => setTab('login')}
        >
          Login
        </button>
        <button
          className={tab === 'register' ? 'active' : ''}
          onClick={() => setTab('register')}
        >
          Register
        </button>
        <button
          className={tab === 'vocabulary' ? 'active' : ''}
          onClick={() => setTab('vocabulary')}
        >
          Vocabulary
        </button>
        <button
          className={tab === 'topics' ? 'active' : ''}
          onClick={() => setTab('topics')}
        >
          Topics
        </button>
      </nav>

      {tab === 'login' && <LoginPage />}
      {tab === 'register' && <RegisterPage />}
      {tab === 'vocabulary' && <AdminVocabularyPage />}
      {tab === 'topics' && <AdminTopicsPage />}
    </>
  )
}

export default App
