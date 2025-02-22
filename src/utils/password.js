import bcrypt from "bcryptjs";

// Hash a password
export const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  console.log("Hashed Password:", hashedPassword);
  return hashedPassword;
};

// Compare password
export const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  console.log("Password Match:", isMatch);
  return isMatch;
};
