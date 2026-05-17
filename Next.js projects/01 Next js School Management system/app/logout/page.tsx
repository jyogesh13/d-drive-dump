"use client";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LogoutPage() {
  const { signOut } = useClerk();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await signOut();
      router.replace("/sign-in");
    };

    logout();
  }, [signOut, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-gray-500">Logging you out...</p>
    </div>
  );
}
