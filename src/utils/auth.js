import { baseUrl } from "./constants";
import { checkStatus } from "./api";
//TODO Remove console.log statements

const signUp = (data) => {
  const { name, avatar, email, password } = data;

  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkStatus);
};

const signIn = (user) => {
  const { email, password } = user;

  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkStatus);
};

export const auth = {
  signUp,
  signIn,
  checkToken,
  updateProfile,
};
