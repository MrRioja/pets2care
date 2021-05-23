import bcrypt from "bcrypt";

export default async (password: string, hash: string) => {
  const isMatch = await bcrypt.compare(password, hash);

  return isMatch;
};
