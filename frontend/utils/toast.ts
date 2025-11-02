import { toast as toastPrimitive, ToastPromiseParams, ToastContent, ToastOptions, Slide, Id } from "react-toastify";
import { ToastConfig } from "./interfaces";

enum ToastType {
  SUCCESS = 'success',
  ALERT = 'alert',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  PROMISE = "promise"
}

interface ToastConfig {
  type: ToastType;
  message: ToastContent;
  dict?: ToastOptions;
  promise?: Promise<any>;
  promiseParams?: ToastPromiseParams;
}

export type { ToastConfig };

let dictOptions: ToastOptions = {
  className: "!tw-z-xhigher tw-max-w-[25rem] !tw-rounded-lg !tw-pt-1 !tw-bg-black !tw-text-white tw-mt-2 md:tw-mt-0",
  progressClassName: "!tw-h-[6px]",
  hideProgressBar: false,
  draggable: false,
  pauseOnHover: true,
  closeOnClick: true,
  position: "top-right",
}
const toast = ({ type, message, dict = {}, promise, promiseParams }: ToastConfig) => {

  dictOptions = {
    ...dictOptions,
    ...dict,
  };

  // save message to session storage and check if it is same as new message, return null if it already exists, remove it after 5 seconds
  const existingMessage = sessionStorage.getItem("toastMessage");
  if (existingMessage === message) {
    return null;
  }
  sessionStorage.setItem("toastMessage", message as string);
  setTimeout(() => {
    sessionStorage.removeItem("toastMessage");
  }, 5000);

  switch (type) {
    case ToastType.SUCCESS:
      return toastPrimitive.success(message, {
        ...dictOptions
      });
    case ToastType.WARNING:
      return toastPrimitive.warn(message, {
        ...dictOptions
      });
    case ToastType.ERROR:
      return toastPrimitive.error(message, {
        ...dictOptions
      });
    case ToastType.INFO:
      return toastPrimitive.info(message, {
        ...dictOptions
      });
    case ToastType.ALERT:
      return toastAlert(message, dictOptions)
    case ToastType.PROMISE:
      return promiseToast(promise!, promiseParams!, dictOptions)
    default:
      return toastPrimitive.info(message, {
        ...dictOptions
      });
  }
}

export const errorToast = (message: ToastContent, dictOptions: ToastOptions = {}) => {
  toast({
    type: ToastType.ERROR,
    message,
    dict: {
      autoClose: 6000,
      ...dictOptions,
    }
  })
}

export const successToast = (message: ToastContent, dictOptions: ToastOptions = {}) => {
  toast({
    type: ToastType.SUCCESS,
    message,
    dict: {
      ...dictOptions,
    }
  })
}

export const warningToast = (message: ToastContent, dictOptions: ToastOptions = {}) => {
  toast({
    type: ToastType.WARNING,
    message,
    dict: {
      ...dictOptions,
    }
  })
};

export const infoToast = (message: ToastContent, dictOptions: ToastOptions = {}) => {
  toast({
    type: ToastType.INFO,
    message,
    dict: {
      ...dictOptions,
    }
  })
};


export const toastAlert = (message: ToastContent, dictOptions: ToastOptions = {}): Id => {
  const result = toast({
    type: ToastType.ALERT,
    message,
    dict: {
      ...dictOptions,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }
  });
  return (result as Id) ?? "";
};

export const promiseToast = (
  promise: Promise<any>,
  promiseParams: ToastPromiseParams,
  dict: ToastOptions = {}
) => {
  toastPrimitive.promise(promise, promiseParams, {
    transition: Slide,
    type: ToastType.INFO,
    ...dictOptions,
    ...dict,
  });
};



export default toast