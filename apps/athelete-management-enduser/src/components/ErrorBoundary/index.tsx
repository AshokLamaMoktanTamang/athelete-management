import { FC } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

import { ErrorState, ErrorStateType } from '@/components';
import styles from './style.module.scss';

const ErrorBoundary: FC<{ homeRoutePath?: string }> = ({ homeRoutePath }) => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) {
      return (
        <div className={styles.boundaryWrapper}>
          You aren't authorized to see this
        </div>
      );
    }

    if (error.status === 404) {
      return (
        <div className={styles.boundaryWrapper}>
          <ErrorState
            type={ErrorStateType.PAGENOTEXIST}
            homeRoutePath={homeRoutePath}
          />
        </div>
      );
    }
  }

  return <div className={styles.boundaryWrapper}>Something went wrong</div>;
};

export default ErrorBoundary;
