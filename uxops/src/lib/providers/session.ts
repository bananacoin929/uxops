import { LOCALSTORAGE_KEY } from '@/config';

export const getKeyFromLocal = (key: string) => {
  let data: any = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!data) return '';
  try {
    let d: any = JSON.parse(data);
    return d[key];
  } catch (error) {
    return '';
  }
};
export const getAllDataFromLocal = () => {
  const data = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!data) return {};
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};
export const clearAllDataFromLocal = () => {
  const data: any = localStorage.removeItem(LOCALSTORAGE_KEY);
  if (!data) return {};
  try {
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
};
export const setKeyInLocal = (key: string, value: string) => {
  try {
    if (!value) return;
    const data = getAllDataFromLocal() || {};
    // const keyData = data[key] || '';
    const newData = { ...data, [key]: value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newData));
  } catch (error) {}
};
export const setGlobalInLocal = (value: string) => {
  try {
    localStorage.setItem(LOCALSTORAGE_KEY, value);
  } catch (error) {}
};
export const deleteKeyInLocal = (key: string, value: string) => {
  try {
    if (!value) return;
    let data: any = getAllDataFromLocal() || {};
    delete data[key];
    // const newData = { ...data, [key]: value };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
  } catch (error) {}
};
export const resetLocalData = () => {
  if (!localStorage) {
    return;
  }
  localStorage.clear();
};
