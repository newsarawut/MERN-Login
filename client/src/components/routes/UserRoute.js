import React from 'react'
import { useSelector } from 'react-redux'
import LoadingtoRedirect from './LoadingtoRedirect'

const UserRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}))



    return user && user.token 
    ? children
    : <LoadingtoRedirect /> 
}

export default UserRoute