import { featuredArticles } from '@/lib/mock-data';
import { notFound } from 'next/navigation';

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = featuredArticles.find((item) => item.slug === slug);
  if (!article) return notFound();

  return (
    <main className="container">
      <article className="card" style={{ maxWidth: 860 }}>
        <span className="badge">{article.category}</span>
        <h1>{article.title}</h1>
        <p className="muted">{article.excerpt}</p>
        <p>
          This article page is wired as the MVP reader experience. In the full system, content will come from MongoDB, premium access checks will happen server-side, and comments, shares, newsletters, and related stories will be attached here.
        </p>
      </article>
    </main>
  );
}
