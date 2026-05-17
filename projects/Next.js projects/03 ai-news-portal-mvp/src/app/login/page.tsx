export default function LoginPage() {
  return (
    <main className="container">
      <div className="card">
        <h1 className="section-title">Login</h1>
        <form className="form">
          <input className="input" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="btn" type="submit">Sign in</button>
        </form>
      </div>
    </main>
  );
}
