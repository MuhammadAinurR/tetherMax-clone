import { toast } from 'react-toastify';

const showToast = (type, message) => {
  console.log('toasted');
  toast[type](message, {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export { showToast };
