import HeaderNavigation from "@/components/header-navigartion";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "@/server/auth";

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session) redirect("/auth");

  return (
    <section className="flex flex-col justify-center items-center h-screen">
      {children}
    </section>
  );
};

export default PrivateLayout;
