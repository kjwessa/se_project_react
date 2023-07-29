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
  return name.length > 0 && imageUrl.length > 0 && ["hot", "warm", "cold"].includes(weather);
};

const UpdateProfileValidation = (name, avatar) => {
  return name.length > 2 && avatar.length >= 0;
};

export { SignUpValidation, LoginValidation, NewItemValidation, UpdateProfileValidation };
