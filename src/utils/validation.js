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

const NewItemValidation = (name, imageUrl, weather) => {
  console.log("Validation: Validating new item...");
  return name.length > 0 && imageUrl.length > 0 && ["hot", "warm", "cold"].includes(weather);
};

const UpdateProfileValidation = (name, avatar) => {
  console.log("Validation: Validating profile update...");
  return name.length > 2 && avatar.length > 2;
};

export { SignUpValidation, LoginValidation, NewItemValidation, UpdateProfileValidation };
