import prisma from "@/lib/prisma";
import { hashPassword } from "@/utils/bcrypt";

const USER_EXISTS_MSG = "User already exists";
const SERVER_ERROR_MSG = "Internal server error";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(JSON.stringify({ msg: USER_EXISTS_MSG }), {
        status: 400,
      });
    }

    // Hash the password and create a new user
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Return the new user without sensitive data
    const { password: _, ...userResponse } = newUser;
    return new Response(JSON.stringify(userResponse), { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(JSON.stringify({ msg: SERVER_ERROR_MSG }), {
      status: 500,
    });
  }
}
