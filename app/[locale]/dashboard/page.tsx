import AccountCard from "./components/AccountCard";
import DashboardHeader from "./components/DashboardHeader";
import UserListingSection from "./components/UserListingSection";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
        <DashboardHeader />

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <UserListingSection />
          <AccountCard />
        </div>
      </div>
    </main>
  );
}
