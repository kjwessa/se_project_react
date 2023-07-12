const baseUrl = "https://my-json-server.typicode.com/kjwessa/se_project_react";
// When the local server is needed
// const baseUrl = "http://localhost:3001";

//TODO Considering updating with async
export const processServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

const getItemList = () => {
  return fetch(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};

//TODO Update with the token and authorization
const addItem = ({ name, weather, imageUrl }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then(processServerResponse);
};

//TODO Update with the token and authorization
const removeItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(processServerResponse);
};

//TODO Add code for liking cards

//TODO Add code for unliking cards

export const api = {
  getItemList,
  addItem,
  removeItem,
};
