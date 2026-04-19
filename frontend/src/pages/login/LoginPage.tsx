import './LoginPage.css'
// import { Link } from 'react-router-dom'

export default function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-brand">
          <img src="/favicon.svg" alt="" />
          <span>English Voca</span>
        </div>

        <header className="login-header">
          <p>Dang nhap</p>
          <h1 id="login-title">Chao mung ban quay lai</h1>
        </header>

        <form className="login-form">
          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Mat khau</span>
            <input type="password" placeholder="Nhap mat khau" />
          </label>

          <div className="login-options">
            <label className="login-checkbox">
              <input type="checkbox" />
              <span>Ghi nho dang nhap</span>
            </label>
            <button className="login-link" type="button">
              Quen mat khau?
            </button>
          </div>

          <button className="login-submit" type="submit">
            Dang nhap
          </button>
          {/*/!* Them Register *!/*/}
          {/*<p className="login-footer">*/}
          {/*  Chua co tai khoan?{' '}*/}
          {/*  <Link to="/register" className="login-link-text">*/}
          {/*    Dang ky*/}
          {/*  </Link>*/}
          {/*  </p>*/}
        </form>
      </section>
    </main>
  )
}
