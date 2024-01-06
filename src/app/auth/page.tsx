import GithubButton from "@/components/github-button";
import SignInForm from "@/components/sign-in-form";
import SignUpDialog from "@/components/sign-up-dialog";

const AuthPage = () => {
  return (
    <main className="flex flex-col h-screen justify-center items-center">
      <div className="flex flex-col space-y-2">
        <SignInForm />
        <SignUpDialog />
        <GithubButton />
      </div>
    </main>
  );
};

export default AuthPage;
