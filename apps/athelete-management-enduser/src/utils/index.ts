import axiosInstance from './axios';
import {
  clearStorage,
  getItem,
  removeItem,
  setItem,
  clearSessionStorage,
  getSessionItem,
  setSessionItem,
} from './storage';
import { toastError, toastInfo, toastSuccess, toastWarning } from './toast';
import errorMessageHandler from './errorMessageHandler';
import logout from './logout';

export {
  axiosInstance,
  errorMessageHandler,
  clearStorage,
  getItem,
  removeItem,
  setItem,
  clearSessionStorage,
  getSessionItem,
  setSessionItem,
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
  logout,
};
