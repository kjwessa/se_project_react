const SignUpValidation = (email, password, name) => {
  return (
    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
    password.length >= 4 &&
    name.length > 2
  );
};

const LoginValidation = (email, password) => {
  return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) && password.length >= 4;
};

const NewItemValidation = (itemName, itemLink, weatherType) => {
  console.log("Validation: Validating new item...");
  return (
    itemName.length > 0 && itemLink.length > 0 && ["hot", "warm", "cold"].includes(weatherType)
  );
};

const UpdateProfileValidation = (name, avatar) => {
  console.log("Validation: Validating profile update...");
  return name.length > 2 && avatar.length > 2;
};

export { SignUpValidation, LoginValidation, NewItemValidation, UpdateProfileValidation };

//TODO Submission: Remove this below if unneeded
// export const validation = {

//   LoginValidation,

//   NewItemValidation,
//   UpdateProfileValidation,
// };

// const SignUpValidation = (email, password, name) => {
//   console.log("Validation: Validating signup...");
//   return (
//     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) &&
//     password.length >= 4 &&
//     name.length > 2
//   );
// };

// const validateName = (name) => {
//   return name.length > 2;
// };

// const validateEmail = (email) => {
//   return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email);
// };

// const validatePassword = (password) => {
//   return password.length >= 8;
// };

// const LoginValidation = (email, password) => {
//   console.log("Validation: Validating login...");
//   return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/gim.test(email) && password.length >= 4;
// };
