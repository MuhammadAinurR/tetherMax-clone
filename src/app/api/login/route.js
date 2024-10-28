import prisma from "@/lib/prisma";
import { comparePassword } from "@/utils/bcrypt";
import jwt from "jsonwebtoken";

const INVALID_CREDENTIALS_MSG = "Invalid email or password";
const SERVER_ERROR_MSG = "Internal server error";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = "1h"; // Set token expiration as needed

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ msg: INVALID_CREDENTIALS_MSG }), {
        status: 401,
      });
    }

    // Validate the password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ msg: INVALID_CREDENTIALS_MSG }), {
        status: 401,
      });
    }

    // Generate a JWT
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRATION,
    });

    // Return the token (and any other relevant user data)
    const { password: _, ...userResponse } = user;
    return new Response(JSON.stringify({ token, user: userResponse }), {
      status: 200,
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ msg: SERVER_ERROR_MSG }), {
      status: 500,
    });
  }
}
