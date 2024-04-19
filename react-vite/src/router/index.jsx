import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage'
import Navigation from '../components/Navigation'
import DiscoverPage from '../components/DiscoverPage';
import SongPage from '../components/SongPage';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />
      },
      {
        element: <Navigation />,
        children: [
          {
            path: "/discover",
            element: <DiscoverPage />,
          },
          {
            path: "login",
            element: <LoginFormPage />,
          },
          {
            path: "signup",
            element: <SignupFormPage />,
          },
          {
            path: "songs/:id",
            element: <SongPage />,
          },
        ],
      },
    ],
  },
]);
