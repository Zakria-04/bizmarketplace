import type { InputHTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";

type AuthInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id"
> & {
  id: string;
  label: string;
  icon: IconType;
  endElement?: ReactNode;
};

export default function AuthInput({
  id,
  label,
  icon: Icon,
  endElement,
  className = "",
  ...inputProps
}: AuthInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute inset-s-4 top-1/2 size-5 -translate-y-1/2 text-slate-400"
        />

        <input
          id={id}
          className={`h-12 w-full rounded-xl border border-slate-300 bg-white ps-11 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-700/10 ${
            endElement ? "pe-12" : "pe-4"
          } ${className}`}
          {...inputProps}
        />

        {endElement && (
          <div className="absolute inset-e-2 top-1/2 -translate-y-1/2">
            {endElement}
          </div>
        )}
      </div>
    </div>
  );
}