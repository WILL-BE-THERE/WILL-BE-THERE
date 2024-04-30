import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import ErrorPage from './components/ErrorPage.tsx'
import Layout from './Layout.tsx'
import Home from './pages/Home.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Events from './pages/Events.tsx'
import EventDetails from './pages/EventDetails.tsx'
import CreateEvent from './pages/CreateEvent.tsx'
import Accounts from './pages/Accounts.tsx'
import Faqs from './pages/Faqs.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import TwoFactorAuth from './pages/TwoFactorAuth.tsx'
import ProjectProvider from './context/project-context.tsx'
import ForgotPasswordComponent from './pages/forgotpassword.tsx'
import NewPasswordComponent from './pages/Newpassword.tsx'
import Rsvp from './pages/Rsvp.tsx'
import HostPage from './pages/HostPage.tsx'
import Dashboard from '../src/pages/dashboard/Dashboard.tsx'
import Event from '../src/pages/dashboard/Event.tsx'
import ProtectedRoutes from '../src/components/ProtectedRoutes.tsx'
import Overview from '../src/pages/dashboard/Overview.tsx'
import Revenue from '../src/pages/dashboard/Revenue.tsx'
import GuestMetrics from '../src/pages/dashboard/GuestMetrics.tsx'
import EventSettings from '../src/pages/dashboard/EventSettings.tsx'
import UserInfo from '../src/pages/dashboard/UserInfo.tsx'
import Googlelogin from '../src/components/Googlesign/googlelogin.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="rsvp" element={<Rsvp />} />
        <Route path="createevent" element={<CreateEvent />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetails />} />
        <Route path="accounts" element={<Accounts />} />
        <Route path="faqs" element={<Faqs />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="googleloginpage" element={<Googlelogin />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route
          path="twofactorauth"
          element={<TwoFactorAuth email={''} verificationCode={''} timer={0} />}
        />
        <Route path="forgotpassword" element={<ForgotPasswordComponent />} />
        <Route path="newpassword" element={<NewPasswordComponent />} />
        <Route path="events/:id/rsvp" element={<Rsvp />} />
        <Route path="host" element={<HostPage />} />
      </Route>

      <Route
        path="dashboard"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      >
        <Route index element={<Overview />} />
        <Route path="event" element={<Event />} />
        <Route path="revenue" element={<Revenue />} />
        <Route path="metrics" element={<GuestMetrics />} />
        <Route path="eventSettings" element={<EventSettings />} />
        <Route path="userInfo" element={<UserInfo />} />
      </Route>
    </>,
  ),
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProjectProvider>
      <RouterProvider router={router} />
    </ProjectProvider>
  </React.StrictMode>,
)
