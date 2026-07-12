"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";

import { Link, useRouter } from "@/i18n/navigation";

import AuthInput from "./AuthInput";
import Brand from "./Brand";
import { useAuthStore } from "@/store/authStore";
import { AiOutlineLoading } from "react-icons/ai";

export type AuthMode = "login" | "signup";

type AuthFormProps = {
  mode: AuthMode;
};

export default function AuthForm({ mode }: AuthFormProps) {
  const t = useTranslations("Auth");
  const tErrors = useTranslations("Errors");
  const { register, login, errorCode, isLoading } = useAuthStore();
  const router = useRouter();

  const isLogin = mode === "login";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("fullName") ?? "").trim();
    const confirmPassword = String(formData.get("confirmPassword") ?? "");
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      if (isLogin) {
        const success = await login({
          email,
          password,
        });

        if (success) {
          router.replace("/dashboard");
        }
        return;
      }

      if (password !== confirmPassword) {
        return;
      }

      await register({
        fullName,
        email,
        password,
      });

      router.replace("/dashboard");
    } catch (error) {
      console.error(error);
    }
  }

  const passwordToggle = (
    <button
      type="button"
      onClick={() => setShowPassword((current) => !current)}
      aria-label={
        showPassword ? t("form.hidePassword") : t("form.showPassword")
      }
      className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
    >
      {showPassword ? (
        <FiEyeOff className="size-5" />
      ) : (
        <FiEye className="size-5" />
      )}
    </button>
  );

  const confirmationToggle = (
    <button
      type="button"
      onClick={() => setShowConfirmation((current) => !current)}
      aria-label={
        showConfirmation ? t("form.hidePassword") : t("form.showPassword")
      }
      className="grid size-9 place-items-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
    >
      {showConfirmation ? (
        <FiEyeOff className="size-5" />
      ) : (
        <FiEye className="size-5" />
      )}
    </button>
  );

  return (
    <section className="flex min-h-dvh items-center justify-center bg-slate-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="w-full max-w-140">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-30px_rgba(15,23,42,0.35)] sm:p-8">
          <Brand centered />

          <div className="mt-7 grid grid-cols-2 rounded-xl border border-slate-200 bg-slate-50 p-1">
            <Link
              href="/auth/login"
              aria-current={isLogin ? "page" : undefined}
              className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                isLogin
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-950"
              }`}
            >
              {t("form.login")}
            </Link>

            <Link
              href="/auth/signup"
              aria-current={!isLogin ? "page" : undefined}
              className={`rounded-lg px-4 py-2.5 text-center text-sm font-semibold transition ${
                !isLogin
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-950"
              }`}
            >
              {t("form.signup")}
            </Link>
          </div>

          <div className="mt-7">
            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              {isLogin ? t("form.loginTitle") : t("form.signupTitle")}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isLogin
                ? t("form.loginDescription")
                : t("form.signupDescription")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            {!isLogin && (
              <AuthInput
                id="fullName"
                name="fullName"
                type="text"
                label={t("form.fullName")}
                placeholder={t("form.fullNamePlaceholder")}
                icon={FiUser}
                autoComplete="name"
                required
              />
            )}

            <AuthInput
              id="email"
              name="email"
              type="email"
              label={t("form.email")}
              placeholder={t("form.emailPlaceholder")}
              icon={FiMail}
              autoComplete="email"
              dir="ltr"
              required
            />

            <AuthInput
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              label={t("form.password")}
              placeholder={t("form.passwordPlaceholder")}
              icon={FiLock}
              autoComplete={isLogin ? "current-password" : "new-password"}
              endElement={passwordToggle}
              required
            />

            {!isLogin && (
              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmation ? "text" : "password"}
                label={t("form.confirmPassword")}
                placeholder={t("form.confirmPasswordPlaceholder")}
                icon={FiLock}
                autoComplete="new-password"
                endElement={confirmationToggle}
                required
              />
            )}

            {isLogin ? (
              <div className="flex items-center justify-between gap-4 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="size-4 rounded border-slate-300 accent-cyan-700"
                  />

                  <span>{t("form.rememberMe")}</span>
                </label>

                <Link
                  href="/auth/forgot-password"
                  className="font-medium text-cyan-700 transition hover:text-cyan-900"
                >
                  {t("form.forgotPassword")}
                </Link>
              </div>
            ) : (
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-5 text-slate-600">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  className="mt-0.5 size-4 shrink-0 rounded border-slate-300 accent-cyan-700"
                  required
                />

                <span>
                  {t("form.agreePrefix")}{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    {t("form.terms")}
                  </Link>{" "}
                  {t("form.and")}{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-cyan-700 hover:text-cyan-900"
                  >
                    {t("form.privacy")}
                  </Link>
                </span>
              </label>
            )}

            {errorCode && (
              <p role="alert" className="text-sm text-red-500">
                {tErrors(errorCode)}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`h-12 w-full rounded-xl bg-linear-to-r from-teal-700 to-emerald-600 px-5 font-semibold text-white shadow-lg shadow-cyan-800/15 transition hover:brightness-105 active:scale-[0.99] ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
            >
              {/* {isLogin ? t("form.loginButton") : t("form.signupButton")} */}
              {isLoading ? (
                <AiOutlineLoading className="animate-spin mx-auto" />
              ) : isLogin ? (
                t("form.loginButton")
              ) : (
                t("form.signupButton")
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-sm text-slate-400">{t("form.or")}</span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <button
            type="button"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-5 font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <FcGoogle className="size-5" />
            <span>{t("form.continueWithGoogle")}</span>
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            {isLogin ? t("form.noAccount") : t("form.alreadyHaveAccount")}{" "}
            <Link
              href={isLogin ? "/auth/signup" : "/auth/login"}
              className="font-semibold text-cyan-700 transition hover:text-cyan-900"
            >
              {isLogin ? t("form.createAccount") : t("form.login")}
            </Link>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-center text-xs text-slate-400">
          <FiLock className="size-4" />
          <span>{t("form.security")}</span>
        </div>
      </div>
    </section>
  );
}
