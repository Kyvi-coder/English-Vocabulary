import './LoginPage.css'

export default function RegisterPage() {
  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="register-title">
        <div className="login-brand">
          <img src="/favicon.svg" alt="" />
          <span>English Voca</span>
        </div>

        <header className="login-header">
          <p>Tao tai khoan</p>
          <h1 id="register-title">Bat dau hoc tu vung moi ngay</h1>
        </header>

        <form className="login-form">
          <label>
            <span>Ho va ten</span>
            <input type="text" placeholder="Nguyen Van A" />
          </label>

          <label>
            <span>Email</span>
            <input type="email" placeholder="you@example.com" />
          </label>

          <label>
            <span>Mat khau</span>
            <input type="password" placeholder="Tao mat khau" />
          </label>

          <label>
            <span>Nhap lai mat khau</span>
            <input type="password" placeholder="Nhap lai mat khau" />
          </label>

          <button className="login-submit" type="submit">
            Tao tai khoan
          </button>
        </form>
      </section>
    </main>
  )
}
