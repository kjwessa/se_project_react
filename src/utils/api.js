import { baseUrl } from "./constants";

export const checkStatus = (res) => {
  if (res.ok) {
    console.log("API: Response is ok");
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getCards = () => {
  console.log("API: Getting items");
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
};

const addCard = ({ name, imageUrl, weather }, token) => {
  console.log("API: Adding item...");
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(checkStatus);
};

const deleteCard = ({ _id, token }) => {
  console.log(`API: Deleting item with ID: ${_id}`);
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkStatus);
};

const addCardLike = (_id, token) => {
  console.log(`Adding like for card with ID: ${_id}`);
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkStatus);
};

const removeCardLike = (_id, token) => {
  console.log(`Removing like for card with ID: ${_id}`);
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkStatus);
};

export const api = {
  getCards,
  addCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
