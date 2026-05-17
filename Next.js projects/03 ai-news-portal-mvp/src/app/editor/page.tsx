export default function EditorPage() {
  return (
    <main className="dashboard-layout">
      <aside className="sidebar">
        <h3>Editor Panel</h3>
        <p className="muted">Drafts, reviews, publishing workflow.</p>
      </aside>
      <section className="content">
        <div className="card">
          <h2 className="section-title">Editorial queue</h2>
          <table className="table">
            <thead>
              <tr><th>Title</th><th>Status</th><th>Visibility</th></tr>
            </thead>
            <tbody>
              <tr><td>AI reshapes local newsrooms</td><td>Review</td><td>Free</td></tr>
              <tr><td>Markets open higher</td><td>Draft</td><td>Premium</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
