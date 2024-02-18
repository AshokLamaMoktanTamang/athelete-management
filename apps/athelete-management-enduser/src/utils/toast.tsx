import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Typography } from '@/components';

const ToastMessageFormat = ({
  message,
  title,
}: {
  message: string;
  title: string;
}) => (
  <>
    <Typography fontsStyle="base-medium" className="toast-title">
      {title}
    </Typography>
    <Typography fontsStyle="small-regular" className="toast-message">
      {message}
    </Typography>
  </>
);

const toastError = (message: string) => {
  toast(<ToastMessageFormat title={'Failure Message'} message={message} />, {
    type: 'error',
  });
};

const toastInfo = (message: string) => {
  toast(<ToastMessageFormat title={'Info Message'} message={message} />, {
    type: 'info',
  });
};

const toastSuccess = (message: string) => {
  toast(<ToastMessageFormat title="Success Message" message={message} />, {
    type: 'success',
  });
};

const toastWarning = (message: string) => {
  toast(<ToastMessageFormat title={'Warning Message'} message={message} />, {
    type: 'warning',
  });
};

export { toastError, toastInfo, toastSuccess, toastWarning };
