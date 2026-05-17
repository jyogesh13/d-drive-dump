export default function RegisterPage() {
  return (
    <main className="container">
      <div className="card">
        <h1 className="section-title">Register</h1>
        <form className="form">
          <input className="input" placeholder="Name" />
          <input className="input" placeholder="Email" />
          <input className="input" type="password" placeholder="Password" />
          <button className="btn" type="submit">Create account</button>
        </form>
      </div>
    </main>
  );
}
