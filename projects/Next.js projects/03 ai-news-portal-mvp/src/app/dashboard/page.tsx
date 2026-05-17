export default function DashboardPage() {
  return (
    <main className="dashboard-layout">
      <aside className="sidebar">
        <h3>User Dashboard</h3>
        <p className="muted">Profile, saved articles, subscription, comments.</p>
      </aside>
      <section className="content">
        <div className="grid grid-3">
          <div className="card"><h3>Subscription</h3><p className="muted">Inactive</p></div>
          <div className="card"><h3>Saved Articles</h3><p className="muted">12 articles</p></div>
          <div className="card"><h3>Comments</h3><p className="muted">8 replies</p></div>
        </div>
      </section>
    </main>
  );
}
