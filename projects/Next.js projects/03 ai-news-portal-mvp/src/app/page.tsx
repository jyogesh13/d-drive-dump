import { ArticleCard } from '@/components/ArticleCard';
import { featuredArticles } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <main className="container">
      <section className="hero">
        <span className="badge">AI News Portal MVP</span>
        <h1 style={{ fontSize: 48, marginBottom: 12 }}>Build a production-shaped news portal, starting with the right MVP.</h1>
        <p className="muted" style={{ maxWidth: 760 }}>
          This starter includes the public newsroom, role-based dashboard areas, article domain models, and the project structure needed for authentication, subscriptions, comments, AI generation, and admin workflows.
        </p>
      </section>

      <section style={{ marginBottom: 32 }}>
        <h2 className="section-title">Featured stories</h2>
        <div className="grid grid-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))}
        </div>
      </section>

      <section className="article-list">
        <div className="card">
          <h2 className="section-title">What this MVP already covers</h2>
          <ul>
            <li>Public news homepage and article pages.</li>
            <li>Admin, editor, and user dashboard entry points.</li>
            <li>MongoDB models for users, categories, and articles.</li>
            <li>Premium-ready article visibility states.</li>
            <li>Expandable structure for NextAuth, Stripe, comments, and AI tools.</li>
          </ul>
        </div>
        <aside className="card">
          <h3 style={{ marginTop: 0 }}>Next integrations</h3>
          <p className="muted">Add NextAuth, Stripe webhooks, media uploads, comments, search, and AI draft generation in the next iteration.</p>
        </aside>
      </section>
    </main>
  );
}
