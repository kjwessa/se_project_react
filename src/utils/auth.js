import { baseUrl } from "./constants";
import { checkStatus } from "./api";

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

const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkStatus);
};

const updateProfile = (data, token) => {
  const { name, avatar } = data;
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(checkStatus);
};

export const auth = {
  checkToken,
  signUp,
  signIn,
  updateProfile,
};
