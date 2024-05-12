// Подключение библиотек
import React, { FC } from 'react';
import { RouterProvider, createHashRouter } from 'react-router-dom';

// Подключение компонентов
import RootPage from 'pages/root/root';
import HomePage from 'pages/home/home-page';
import RecursionPage from 'pages/recursion/recursion-page';
import FibonacciPage from 'pages/fibonacci/fibonacci-page';
import ListPage from 'pages/list/list-page';
import QueuePage from 'pages/queue/queue-page';
import SortingPage from 'pages/sorting/sorting-page';
import StackPage from 'pages/stack/stack-page';

// Создаем роутер
const router = createHashRouter([
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'recursion',
        element: <RecursionPage />,
      },
      {
        path: 'fibonacci',
        element: <FibonacciPage />,
      },
      {
        path: 'arr',
        element: <SortingPage />,
      },
      {
        path: 'stack',
        element: <StackPage />,
      },
      {
        path: 'queue',
        element: <QueuePage />,
      },
      {
        path: 'list',
        element: <ListPage />,
      },
    ],
  },
]);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
