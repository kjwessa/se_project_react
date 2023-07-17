import { baseUrl } from "./constants";
//TODO Remove console.log statements

export const checkStatus = (res) => {
  if (res.ok) {
    console.log("Response is ok");
    return res.json();
  }
  console.log("Response Error", res.status);
  return Promise.reject(`Error: ${res.status}`);
};

const getCards = () => {
  console.log("Getting items");
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(checkStatus);
};

const addCard = ({ name, imageUrl, weather }, token) => {
  console.log("Adding item...");
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
  console.log(`Deleting item with ID: ${_id}`);
  return fetch(`${baseUrl}/items/${_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkStatus);
};

const addCardLike = ({ _id, user }, token) => {
  console.log(`Adding like for card with ID: ${_id}`);
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ _id, user }),
  }).then(checkStatus);
};

const removeCardLike = ({ _id }, token) => {
  console.log(`Removing like for card with ID: ${_id}`);
  return fetch(`${baseUrl}/items/${_id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ _id }),
  }).then(checkStatus);
};

export const api = {
  getCards,
  addCard,
  deleteCard,
  addCardLike,
  removeCardLike,
};
