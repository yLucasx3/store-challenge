export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <nav>section layout</nav>
      {children}
    </section>
  );
}
