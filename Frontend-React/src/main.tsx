import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import ErrorPage from './components/ErrorPage.tsx';
import Layout from './Layout.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import Contact from './pages/Contact.tsx';
import Events from './pages/Events.tsx';
import Accounts from './pages/Accounts.tsx';
import Faqs from './pages/Faqs.tsx';
import LoginPage from './pages/LoginPage.tsx';
import SignUpPage from './pages/SignUpPage.tsx';
import TwoFactorAuth from './pages/TwoFactorAuth.tsx';
import ProjectProvider from './context/project-context.tsx';
import ForgotPasswordComponent from './pages/forgotpassword.tsx';
import NewPasswordComponent from './pages/Newpassword.tsx';
import Rsvp from './pages/Rsvp.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='events' element={<Events />} />
      <Route path='accounts' element={<Accounts />} />
      <Route path='faqs' element={<Faqs />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignUpPage />} />
      <Route
        path='twofactorauth'
        element={
          <TwoFactorAuth phoneNumber={''} verificationCode={''} timer={30} />
        }
      />
      <Route path='forgotpassword' element={<ForgotPasswordComponent />} />
      <Route path='newpassword' element={<NewPasswordComponent />} />
      <Route path='rsvp' element={<Rsvp />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </React.StrictMode>
);
