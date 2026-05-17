"use client";

import { useSignIn, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignInPage = () => {
  const { signIn, errors, fetchStatus } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { isSignedIn, user, isLoaded } = useUser();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    await signIn.password({
      emailAddress,
      password,
    });
    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: ({ session }) => {
          if (session?.currentTask) {
            console.log(session?.currentTask);
            return;
          }
          router.push("/admin");
        },
      });
    }
  };

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (role) {
      router.push(`/${role}`);
    }
  }, [user, router]);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-LightSky">
      <div className="bg-white p-12 rounded-md shadow-2xl flex flex-col gap-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Image src={"/logo.png"} alt="logo" width={24} height={24} />
          MySchoolApp
        </h1>
        <h2 className="text-gray-400">Sign in to your account</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-xs text-gray-400">
              Email address or username
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={emailAddress}
              className="ring-1 ring-gray-400 p-1 rounded-md focus:outline-0"
              onChange={(e) => setEmailAddress(e.target.value)}
            />
            {errors.fields.identifier && (
              <p className="text-sm text-red-400">
                {errors.fields.identifier.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-xs text-gray-400">
              Enter password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              className="ring-1 ring-gray-400 p-1 rounded-md focus:outline-0"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.fields.password && (
              <p className="text-sm text-red-400">
                {errors.fields.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={fetchStatus === "fetching"}
            className="w-full bg-blue-400 text-white p-2 rounded-md"
          >
            Continue
          </button>
        </form>
        <div id="clerk-captcha" />
      </div>
    </div>
  );
};

export default SignInPage;
