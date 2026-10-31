import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import { UserPlus } from "lucide-react";

import AuthField from "../components/authField";
import { useRegister } from "../hooks/useAuth";
import { registerSchema, type RegisterInput } from "../types/authSchemas";

const RegisterPage = () => {
  const { mutate, isPending, error } = useRegister();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="w-full max-w-md space-y-6 rounded-2xl border border-white/[0.08] bg-[#111827] p-6 sm:p-8"
    >
      <div>
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
          <UserPlus size={23} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create your account
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Start capturing your ideas.
        </p>
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
        autoComplete="new-password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register("password")}
      />

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:bg-gray-500/30"
      >
        <UserPlus size={18} />
        {isPending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-slate-400">
        Already have an account?{" "}
        <Link
          to="/auth/login"
          className="font-medium text-violet-400 hover:text-violet-300"
        >
          Log in
        </Link>
      </p>
    </form>
  );
};

export default RegisterPage;
