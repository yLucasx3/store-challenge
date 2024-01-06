import { userService } from "@/server/services/user-service";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { username, email, password } = await request.json();

  const existingUserUsername = await userService.findUserByUsername(username);

  if (existingUserUsername) {
    return NextResponse.json(
      { message: "Username is already in use", field: "username" },
      { status: 400 }
    );
  }

  const existingUserEmail = await userService.findUserByEmail(email);

  if (existingUserEmail) {
    return NextResponse.json(
      { message: "Email is already in use", field: "email" },
      { status: 400 }
    );
  }

  try {
    await userService.createUser({ username, email, password });
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    return new NextResponse(err, {
      status: 500,
    });
  }
};
