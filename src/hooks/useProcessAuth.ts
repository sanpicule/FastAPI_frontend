import { FormEvent, useState } from "react"
import { useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { useMutateAuth } from "./useMutateAuth"

export const useProcessAuth = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [email, setEmail] = useState('')
  const [pwd, setPwd] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const { loginMutation, registerMutation, logoutMutation} = useMutateAuth()

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pwd
      })
    } else {
      await registerMutation
        .mutateAsync({
          email: email,
          password: pwd
        })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pwd
          })
        )
        .catch(() => {
          setPwd('')
          setEmail('')
        })
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync({ email: email, password: pwd })
    queryClient.removeQueries('tasks')
    queryClient.removeQueries('user')
    queryClient.removeQueries('single')
    navigate('/')
  }
  return {
    email,
    pwd,
    isLogin,
    registerMutation,
    loginMutation,
    setPwd,
    setIsLogin,
    processAuth,
    setEmail,
    logout
  }
}

