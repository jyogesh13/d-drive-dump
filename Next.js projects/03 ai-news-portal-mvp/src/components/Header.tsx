import Link from 'next/link';

export function Header() {
  return (
    <header className="header">
      <div className="nav container">
        <Link href="/"><strong>PulsePress</strong></Link>
        <nav className="nav-links">
          <Link href="/news">News</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/editor">Editor</Link>
          <Link href="/admin">Admin</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
