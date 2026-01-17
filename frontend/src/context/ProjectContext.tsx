/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'
import { getCookie } from '../pages/CookieUtils'

type Bool = true | false

type ProjectContextProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<Bool>>
  signUpClicked: boolean
  setSignUpClicked: React.Dispatch<React.SetStateAction<Bool>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<Bool>>
  signUpUserInfo: typeof signUpInfo
  setSignUpUserInfo: React.Dispatch<React.SetStateAction<typeof signUpInfo>>
  loginUserInfo: typeof loginInfo
  setLoginUserInfo: React.Dispatch<React.SetStateAction<typeof loginInfo>>
  loggedInUserInfo: typeof loggedInDetails
  setLoggedInUserInfo: React.Dispatch<
    React.SetStateAction<typeof loggedInDetails>
  >
  initSignup: () => void
}

type ProjectContextProviderProps = {
  children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextProps | null>(null)

const signUpInfo = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  password: '',
  confirm_password: '',
}

const loginInfo = {
  email: '',
  password: '',
}

const loggedInDetails = {
  token: getCookie('Token') || '',

  user: {
    id: getCookie('id') || '',
    username: getCookie('username') || '',
    email: getCookie('email') || '',
    first_name: getCookie('first_name') || '',
    last_name: getCookie('last_name') || '',
  },
};


const ProjectProvider = ({ children }: ProjectContextProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<Bool>(false)
  const [signUpClicked, setSignUpClicked] = useState<Bool>(false)
  const [isLoggedIn, setIsLoggedIn] = useState<Bool>(false)
  const [signUpUserInfo, setSignUpUserInfo] = useState(signUpInfo)
  const [loginUserInfo, setLoginUserInfo] = useState(loginInfo)
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(loggedInDetails)

  const initSignup = () => setLoginUserInfo(signUpInfo)

  return (
    <ProjectContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        signUpClicked,
        setSignUpClicked,
        isLoggedIn,
        setIsLoggedIn,
        signUpUserInfo,
        setSignUpUserInfo,
        loginUserInfo,
        setLoginUserInfo,
        loggedInUserInfo,
        setLoggedInUserInfo,
        initSignup,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export const useProjectContext = () => {
  const context = useContext(ProjectContext)

  if (context === null) {
    throw new Error(
      'ActiveSideBarProvider can only be used within ProjectContext',
    )
  }
  return context
}

export default ProjectProvider
