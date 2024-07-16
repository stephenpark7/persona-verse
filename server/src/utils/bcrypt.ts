import bcrypt from 'bcryptjs';

const hash = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
}

export default {
  hash,
  compare,
};
