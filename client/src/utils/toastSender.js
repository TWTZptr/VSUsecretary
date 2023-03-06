import { toast } from 'react-toastify';

const defaultErrorOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
};

export const toastError = (text, options = defaultErrorOptions) => {
  toast.error(text, { ...defaultErrorOptions, ...options });
};
