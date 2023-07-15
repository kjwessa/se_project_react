import { emailRegex } from "./constants";

const LoginValidation = (email, password) => {
  return emailRegex.test(email) && password.length >= 4;
};

const SignUpValidation = (email, password, name) => {
  return emailRegex.test(email) && password.length >= 4 && name.length > 2;
};

const NewItemValidation = (itemName, itemLink, weatherType) => {
  return (
    itemName.length > 0 && itemLink.length > 0 && ["hot", "warm", "cold"].includes(weatherType)
  );
};

const UpdateProfileValidation = (name, avatar) => {
  return name.length > 2 && avatar.length > 2;
};

export const validation = {
  LoginValidation,
  SignUpValidation,
  NewItemValidation,
  UpdateProfileValidation,
};
