// notifications.ts
import { toast } from 'react-hot-toast';

export const successNotification = (message: string) => {
  toast.success(message, {
    id: `success${message}`,
    position: 'top-right',
    duration: 3000,
    style: {
      backgroundColor: '#57CA22',
      color: 'white',
      textAlign: 'center',
      fontSize: '16px',
    },
  });
};

export const infoNotification = (message: string) => {
  toast(message, {
    id: `info${message}`,
    icon: 'ℹ️',
    position: 'top-right',
    duration: 3000,
    style: {
      backgroundColor: '#7659F6',
      color: 'white',
      textAlign: 'center',
      fontSize: '16px',
    },
  });
};

export const errorNotification = (message: string) => {
  toast.error(message, {
    id: `error${message}`,
    position: 'top-right',
    duration: 3000,
    style: {
      backgroundColor: '#FF1943',
      color: 'white',
      textAlign: 'center',
      fontSize: '16px',
    },
  });
};

export const warningNotification = (message: string) => {
  toast(message, {
    id: `warning${message}`,
    icon: '⚠️',
    position: 'top-right',
    duration: 3000,
    style: {
      backgroundColor: '#FFA319',
      color: 'white',
      textAlign: 'center',
      fontSize: '16px',
    },
  });
};
