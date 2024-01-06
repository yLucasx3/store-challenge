import connect from "@/lib/mongo";
import User from "@/models/user";
import bcrypt from "bcrypt";

const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  return user;
};

const findUserByUsername = async (username: string) => {
  const user = await User.findOne({ username });

  return user;
};

const authenticate = async (username: string, password: string) => {
  connect();

  console.log(username, password);
  try {
    const user = await findUserByUsername(username);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (isPasswordCorrect) {
        return user;
      }
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

const validateUser = async (username: string, email: string) => {
  await connect();

  const existingUser = await findUserByEmail(email);

  try {
    if (!existingUser) {
      const newUser = new User({
        username,
        email,
      });

      await newUser.save();
    }

    return true;
  } catch (error) {
    console.log(`Error saving user: ${error}`);
  }
};

const createUser = async (user: {
  username: string;
  email: string;
  password: string;
}) => {
  const { username, email, password } = user;

  await connect();

  const existingUserUsername = await findUserByUsername(username);

  if (existingUserUsername) {
    throw new Error("Username is already in use.");
  }

  const existingUserEmail = await findUserByEmail(email);

  if (existingUserEmail) {
    throw new Error("Email is already in use.");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    console.log(`Error creating user: ${error}`);
  }
};

export const userService = {
  findUserByEmail,
  findUserByUsername,
  authenticate,
  validateUser,
  createUser,
};
