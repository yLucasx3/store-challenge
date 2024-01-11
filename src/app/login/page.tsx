import GithubButton from "@/components/github-button";
import LoginForm from "@/components/login-form";
import RegisterDialog from "@/components/register-dialog";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

const AuthPage = async () => {
  const session = await getServerAuthSession();

  if (session) redirect("/");

  return (
    <main
      className="flex flex-col items-center justify-center"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className="flex flex-col space-y-2 w-64 ">
        <h1 className="text-center py-6 text-xl">Store Challenge</h1>

        <LoginForm />
        <RegisterDialog />

        <div className="flex justify-between items-center gap-2 py-4">
          <hr className="border-x border-slate-700 w-full"></hr>
          <span className="text-nowrap text-sm">continue with</span>
          <hr className="border-x border-slate-700 w-full"></hr>
        </div>

        <GithubButton />
      </div>
    </main>
  );
};

export default AuthPage;
