import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { LogIn } from "lucide-react";

import AuthField from "../components/authField";
import { useLogin } from "../hooks/useAuth";
import { loginSchema, type LoginInput } from "../types/authSchemas";

const LoginPage = () => {
  const { mutate, isPending, error } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="w-full max-w-md space-y-6 rounded-2xl border border-white/[0.08] bg-[#111827] p-6 sm:p-8"
    >
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <LogIn size={23} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-slate-400">Log in to see your notes.</p>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
        >
          {error.message}
        </p>
      )}

      <AuthField
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register("email")}
      />
      <AuthField
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        error={errors.password?.message}
        {...register("password")}
      />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-gray-500/30"
      >
        <LogIn size={18} />
        {isPending ? "Logging in..." : "Log in"}
      </button>

      <p className="text-center text-sm text-slate-400">
        No account?{" "}
        <Link
          to="/auth/register"
          className="font-medium text-violet-400 hover:text-violet-300"
        >
          Create one
        </Link>
      </p>
    </form>
  );
};

export default LoginPage;
