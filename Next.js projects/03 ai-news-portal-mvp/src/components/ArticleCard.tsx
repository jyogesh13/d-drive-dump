import Link from 'next/link';

type Props = {
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  premium?: boolean;
};

export function ArticleCard({ title, excerpt, slug, category, premium }: Props) {
  return (
    <article className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 12 }}>
        <span className="badge">{category}</span>
        {premium ? <span className="badge">Premium</span> : null}
      </div>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p className="muted">{excerpt}</p>
      <Link className="btn btn-secondary" href={`/news/${slug}`}>Read article</Link>
    </article>
  );
}
