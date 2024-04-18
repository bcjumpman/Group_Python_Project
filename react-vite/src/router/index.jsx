import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage'
import Navigation from '../components/Navigation'
import UserPage from '../components/ProfilePage/ProfilePage';
// import EditProfile from '../components/ProfilePage/EditProfile'

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
      {
        path: "/profile/:userId",
        element: <UserPage />
      },
      // {
      //   path: "/profile/:userId/edit",
      //   element: <EditProfile />
      // },
      {
        path: "*",
        element: <h1>PAGE NOT FOUND</h1>
      },
    ],
  },
]);
