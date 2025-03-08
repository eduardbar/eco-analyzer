declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: string;
      PORT?: string;
      DATABASE_URL?: string;
      JWT_SECRET?: string;
      GEMINI_API_KEY?: string;
    }
  }

  var prisma: import('@prisma/client').PrismaClient | undefined;
}

export {};
