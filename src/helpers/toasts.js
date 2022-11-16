import { toast } from 'react-toastify'

const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

export function setSuccessToast(message) {
  toast.success(message, toastOptions)
}

export function setErrorToast(message) {
  toast.error(message, toastOptions)
}
