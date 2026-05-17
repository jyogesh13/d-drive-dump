import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useAuth";
import axios from "axios";

const loginSchema = z
  .object({
    userInput: z.string().min(1, "Username or email is required"),
    password: z.string().min(8, "password should be min 8 character"),
  })
  .strict();

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const errorMessage = axios.isAxiosError(loginMutation.error)
    ? loginMutation.error.response?.data?.message
    : "Login failed. Please try again.";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-white">Welcome back</h2>
        <p className="text-slate-400 text-sm mt-1">Sign in to your account</p>
      </div>

      {/* Server error */}
      {loginMutation.isError && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-sm text-red-400">
          {errorMessage || "Login failed. Please try again."}
        </div>
      )}

      {/* userInput */}
      <div>
        <label
          htmlFor="login-userInput"
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          Email or Username
        </label>
        <input
          id="login-userInput"
          type="text"
          autoComplete="username"
          {...register("userInput")}
          placeholder="you@example.com"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
        />
        {errors.userInput && (
          <p className="mt-1 text-xs text-red-400">
            {errors.userInput.message}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="login-password"
          className="block text-sm font-medium text-slate-300 mb-1.5"
        >
          Password
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          placeholder="••••••••"
          className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200 text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="w-full py-2.5 rounded-xl bg-linear-to-r from-blue-600 to-purple-600 text-white font-medium text-sm hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-[0.98]"
      >
        {loginMutation.isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 animate-spin"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Signing in…
          </span>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Register link */}
      <p className="text-center text-sm text-slate-400">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}
