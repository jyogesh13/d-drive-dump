import "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        _id: string;
        name: string;
        email: string;
        role: "user" | "editor" | "admin";
        status: "active" | "blocked" | "pending";
        emailVerified?: boolean;
        subscriptionStatus?: string;
      };
    }
  }
}