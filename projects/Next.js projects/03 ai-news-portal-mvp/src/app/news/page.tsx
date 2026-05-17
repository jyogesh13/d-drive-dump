import { ArticleCard } from '@/components/ArticleCard';
import { featuredArticles } from '@/lib/mock-data';

export default function NewsPage() {
  return (
    <main className="container">
      <h1 className="section-title">Latest news</h1>
      <div className="grid grid-3">
        {featuredArticles.map((article) => (
          <ArticleCard key={article.slug} {...article} />
        ))}
      </div>
    </main>
  );
}
