/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react'

type Bool = true | false

type ProjectContextProps = {
  isSidebarOpen: boolean
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<Bool>>
  signUpClicked: boolean
  setSignUpClicked: React.Dispatch<React.SetStateAction<Bool>>
  eventName: string
  setEventName: React.Dispatch<React.SetStateAction<string>>
}

type ProjectContextProviderProps = {
  children: React.ReactNode
}

const ProjectContext = createContext<ProjectContextProps | null>(null)

const ProjectProvider = ({ children }: ProjectContextProviderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<Bool>(false)
  const [signUpClicked, setSignUpClicked] = useState<Bool>(false)
  const [eventName, setEventName] = useState<string>('')
  return (
    <ProjectContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        signUpClicked,
        setSignUpClicked,
        eventName,
        setEventName,
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
