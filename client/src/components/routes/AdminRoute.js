import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LoadingtoRedirect from './LoadingtoRedirect'
import { currentAdmin } from '../functions/auth'

const AdminRoute = ({children}) => {
    const { user } = useSelector((state) => ({...state}))
    const[ok, setOk] = useState(false)

    useEffect(() => {

        if(user && user.token){
            currentAdmin(user.token)
            .then(res => {
                //res
                console.log(res)
                setOk(true)
            }).catch(err => {
                //err
                console.log(err)
                setOk(false)
            })
        }


    },[user])

    return ok
    ? children
    : <LoadingtoRedirect /> 
}

export default AdminRoute