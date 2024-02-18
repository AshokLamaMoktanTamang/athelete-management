import { FC, PropsWithChildren } from 'react';

const FullLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      Full Layout
      {children}
    </>
  );
};

export default FullLayout;
