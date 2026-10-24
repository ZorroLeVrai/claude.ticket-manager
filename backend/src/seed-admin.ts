import { auth } from "./lib/auth";
import { prisma } from "./lib/prisma";

const email = process.env.ADMIN_EMAIL!;
const password = process.env.ADMIN_PASSWORD!;

const ctx = await auth.$context;

if (await ctx.internalAdapter.findUserByEmail(email)) {
  await prisma.user.update({ where: { email }, data: { role: "admin" } });
  console.log(`User ${email} already exists; ensured admin role`);
} else {
  const user = await ctx.internalAdapter.createUser(
    { email, name: "Admin", emailVerified: true, role: "admin" },
    { method: "admin" },
  );
  await ctx.internalAdapter.linkAccount({
    userId: user.id,
    providerId: "credential",
    accountId: user.id,
    password: await ctx.password.hash(password),
  });
  console.log(`Created user ${email}`);
}

await prisma.$disconnect();
