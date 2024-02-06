import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
}
