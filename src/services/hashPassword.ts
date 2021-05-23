import bcrypt from "bcrypt";

export default async (password: string) => {
  const hash = await bcrypt.hash(password, 12);

  return hash;
};
