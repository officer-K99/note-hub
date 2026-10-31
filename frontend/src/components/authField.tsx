import type { ComponentProps } from "react";

interface AuthFieldProps extends ComponentProps<"input"> {
  id: string;
  label: string;
  error?: string;
}

const AuthField = ({ id, label, error, ...props }: AuthFieldProps) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-slate-200">
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className="w-full rounded-xl border border-white/10 bg-[#070b1a] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10"
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="text-sm text-red-400">
        {error}
      </p>
    )}
  </div>
);

export default AuthField;
