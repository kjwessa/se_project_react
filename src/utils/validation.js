const LoginValidation = (email, password) => {
  console.log("Validating login...");
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) && password.length >= 4;
};

const SignUpValidation = (email, password, name) => {
  console.log("Validating signup...");
  return (
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
    password.length >= 4 &&
    name.length > 2
  );
};

const validateName = (name) => {
  return name.length > 2;
};

const validateEmail = (email) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);
};

const validatePassword = (password) => {
  return password.length >= 8;
};

const NewItemValidation = (itemName, itemLink, weatherType) => {
  console.log("Validating new item...");
  return (
    itemName.length > 0 && itemLink.length > 0 && ["hot", "warm", "cold"].includes(weatherType)
  );
};

const UpdateProfileValidation = (name, avatar) => {
  console.log("Validating profile update...");
  return name.length > 2 && avatar.length > 2;
};

export const validation = {
  validateName,
  validatePassword,
  validateEmail,
  LoginValidation,
  SignUpValidation,
  NewItemValidation,
  UpdateProfileValidation,
};
