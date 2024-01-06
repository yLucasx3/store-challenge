import HeaderNavigation from "@/components/header-navigartion";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <HeaderNavigation />
      <section className="flex flex-col justify-center items-center h-screen">
        {children}
      </section>
    </section>
  );
};

export default DefaultLayout;
