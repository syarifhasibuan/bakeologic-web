import { Outlet } from "react-router";

import { Footer } from "~/components/layout/footer";
import { Header } from "~/components/layout/header";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main id="main" className="grow flex flex-col items-center">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
