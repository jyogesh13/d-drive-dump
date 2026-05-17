export default function AdminPage() {
  return (
    <main className="dashboard-layout">
      <aside className="sidebar">
        <h3>Admin Panel</h3>
        <p className="muted">Users, categories, banners, subscriptions, site settings.</p>
      </aside>
      <section className="content">
        <div className="grid grid-3">
          <div className="card"><h3>Users</h3><p className="muted">1,248 registered</p></div>
          <div className="card"><h3>Articles</h3><p className="muted">248 published</p></div>
          <div className="card"><h3>Revenue</h3><p className="muted">Stripe-ready</p></div>
        </div>
        <div className="card" style={{ marginTop: 20 }}>
          <h2 className="section-title">Category management</h2>
          <table className="table">
            <thead>
              <tr><th>Name</th><th>Slug</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>Technology</td><td>technology</td><td>Active</td></tr>
              <tr><td>Markets</td><td>markets</td><td>Active</td></tr>
              <tr><td>Business</td><td>business</td><td>Active</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
