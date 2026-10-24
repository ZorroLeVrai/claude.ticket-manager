import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: { enabled: true, disableSignUp: true },
  user: {
    additionalFields: {
      role: {
        type: ["admin", "agent"],
        defaultValue: "agent",
        input: false,
      },
    },
  },
  trustedOrigins: [process.env.FRONTEND_URL!],
});
