import { Navigate, createBrowserRouter } from 'react-router-dom';

import { AuthLayout, FullLayout } from '@layouts/index';
import { ErrorBoundary } from '@/components';

import { authLayoutRoutes } from './public.route';
import { fullLayoutRoutes } from './private.route';
import { PrivateRoute, PublicRoute } from './route';

import { RouteType } from './type';
import { getItem } from '@/utils';

const RouteWrapperComponent = (routeType: RouteType, component: any) => {
  const ComponentWrapped = component;

  if (routeType === RouteType.PRIVATE) {
    return (
      <PrivateRoute>
        <ComponentWrapped />
      </PrivateRoute>
    );
  }

  return (
    <PublicRoute>
      <ComponentWrapped />
    </PublicRoute>
  );
};

const token = getItem<string>('token');

const Routes = createBrowserRouter([
  {
    path: '',
    errorElement: <ErrorBoundary homeRoutePath="challenges" />,
    element: token ? (
      <Navigate to="/challenges" replace />
    ) : (
      <Navigate to="/login" replace />
    ),
  },
  {
    element: <AuthLayout />,
    errorElement: <ErrorBoundary homeRoutePath="challenges" />,
    children: authLayoutRoutes?.map((item) => ({
      path: item?.path,
      lazy: async () => {
        const ImportComponent = await item.component();
        return {
          Component: () => RouteWrapperComponent(item.type, ImportComponent),
        };
      },
    })),
  },
  {
    element: <FullLayout />,
    errorElement: (
      <FullLayout>
        <ErrorBoundary homeRoutePath="challenges" />
      </FullLayout>
    ),
    children: fullLayoutRoutes?.map((item) => ({
      path: item?.path,
      lazy: async () => {
        const ImportComponent = await item.component();
        return {
          Component: () => RouteWrapperComponent(item.type, ImportComponent),
        };
      },
      ...(item?.children && {
        children: item.children?.map((child: any) => {
          return {
            path: child?.path,
            lazy: async () => {
              const ImportComponent = await child.component();
              return {
                Component: ImportComponent,
              };
            },
          };
        }),
      }),
    })),
  },
]);

export default Routes;
