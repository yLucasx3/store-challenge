"use client";
import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const GithubButton = () => {
  return (
    <Button
      variant="secondary"
      onClick={() => signIn("github", { callbackUrl: "/" })}
    >
      <GitHubLogoIcon className="mr-2 h-4 w-4" />
      Github
    </Button>
  );
};

export default GithubButton;
