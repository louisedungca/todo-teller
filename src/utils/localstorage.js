// get local storage
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

// set local storage
export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
}

// delete item
export const deleteItem = ({ key, id }) => {
  const existingData = getLocalStorage(key);

  if (id) {
    const newData = existingData.filter((item) => item.id !== id);

    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};