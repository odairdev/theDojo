import { createContext, useEffect, useReducer } from "react"
import { projectAuth } from "../firebase/config"

export const AuthContext = createContext()

const authReducer = (state, action) => {
  switch(action.type) {
    case 'AUTH_IS_READY':
      return {...state, authIsReady: true}
    case 'LOGIN':
      return {...state, user: action.payload}
    case 'LOGOUT':
      return {...state, user: null}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  })

  useEffect(() => {
    const unsub = projectAuth.onAuthStateChanged(user => {
      dispatch({type: 'AUTH_IS_READY', payload: user})
      unsub()
    })
  }, [])


  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}