import AuthForm, { type AuthMode } from "./AuthForm";
import AuthHero from "./AuthHero";

type AuthPageProps = {
  mode: AuthMode;
};

export default function AuthPage({ mode }: AuthPageProps) {
  return (
    <main className="min-h-dvh bg-slate-50 lg:grid lg:grid-cols-[minmax(0,1.08fr)_minmax(480px,0.92fr)]">
      <AuthHero />
      <AuthForm mode={mode} />
    </main>
  );
}