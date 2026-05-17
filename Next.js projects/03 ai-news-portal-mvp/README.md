# AI News Portal MVP

This MVP is a production-shaped starter for the full-stack GenAI news portal described in the Udemy course.

## Included
- Next.js App Router structure
- Public newsroom pages
- User, editor, and admin dashboard shells
- MongoDB models for User, Category, and Article
- Premium-ready article states
- Environment template for NextAuth, Stripe, and MongoDB

## Recommended next steps
1. Add NextAuth credentials and OAuth providers.
2. Add route protection middleware based on user role.
3. Replace mock article data with MongoDB queries.
4. Add article CRUD APIs and editor workflows.
5. Integrate Stripe checkout and webhook sync.
6. Add media upload, comments, search, and AI draft generation.

## Run locally
```bash
npm install
npm run dev
```

## Suggested folders to add next
- `src/app/api/auth/*`
- `src/app/api/articles/*`
- `src/app/api/categories/*`
- `src/lib/auth.ts`
- `src/lib/stripe.ts`
- `src/lib/permissions.ts`
- `src/models/Comment.ts`
- `src/models/Subscription.ts`
