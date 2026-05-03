import Navbar from '@/components/dashboard/navbar';
import Sidebar from '@/components/dashboard/sidebar';
import AuthGuard from '@/components/dashboard/auth-gaurd';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen w-full">
        {/* Sidebar wrapper */}
        <aside className="hidden lg:flex w-2/12 border-r min-h-screen">
          <div className="w-full h-1/12 rounded-xl shadow-md sticky top-6 m-4">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <header className="sticky top-0 z-50 border-b bg-background">
            <Navbar />
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
        </div>
      </div>
    </AuthGuard>
  );
}
