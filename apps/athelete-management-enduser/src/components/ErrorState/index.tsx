import { FC } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@/components';
import { Image404Error } from '@assets/images';
import style from './style.module.scss';

export enum ErrorStateType {
  PAGENOTEXIST = 'Page-not-found',
  SERVERERROR = 'Server-error',
}

export interface ErrorStateProps {
  type?: ErrorStateType;
  homeRoutePath?: string;
}

const ErrorState: FC<ErrorStateProps> = ({ type, homeRoutePath }) => {
  const images = [
    {
      type: ErrorStateType.PAGENOTEXIST,
      image: Image404Error,
      text: 'Panda is Hibernating!',
    },
  ];

  const imageToUse = images.find((item) => item.type === type);
  return (
    <div className={style.emptyErrorWrapper}>
      <div className={style.emptyErrorWrapper__image}>
        <img src={imageToUse?.image} alt="error-state" />
      </div>
      <div className={style.emptyErrorWrapper__descrption}>
        <div className={style.emptyErrorWrapper__title}>
          <Typography color="common-neutrals-gray" fontsStyle="large-regular">
            {imageToUse?.text}
          </Typography>
        </div>
        <div>
          <Typography color="common-neutrals-gray" fontsStyle="base-regular">
            Verify the URL or navigate to the{' '}
            <Typography
              fontsStyle="base-medium"
              component="span"
              className={style.emptyErrorWrapper__link}
            >
              <Link to={homeRoutePath || 'home'} className={style.link}>
                Home Page.
              </Link>
            </Typography>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
