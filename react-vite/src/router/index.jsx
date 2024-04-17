import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage'
import Navigation from '../components/Navigation'

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
            element: <h1>Welcome!</h1>,
          },
          {
            path: "login",
            element: <LoginFormPage />,
          },
          {
            path: "signup",
            element: <SignupFormPage />,
          },
        ],
      },
    ],
  },
]);
