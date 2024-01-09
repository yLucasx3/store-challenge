declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      GITHUB_CLIENT_ID: string;
      GITHUB_CLIENT_SECRET: string;
      MONGODB_URI: string;
      API_URL: string;
    }
  }
}

export {};
