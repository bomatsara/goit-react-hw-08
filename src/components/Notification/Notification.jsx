import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { selectNotification } from '../../redux/notification/selectors';

export default function Notification() {
  const notification = useSelector(selectNotification);

  useEffect(() => {
    if (notification.message) {
      switch (notification.type) {
        case 'success':
          toast.success(notification.message);
          break;
        case 'error':
          toast.error(notification.message);
          break;
        default:
          break;
      }
    }
  }, [notification]);

  return <Toaster position="top-center" reverseOrder={false} />;
}