import { Button, Input } from 'antd'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const postData = async () => {
        const body = {
            email: email,
            password: password
        }
        const url = 'http://localhost:4040/controller/login'
        const response = await axios.post(url, body)
        if (response.data.success === true) {
            const token = response.data.data
            Cookies.set('token', token)
            navigate('/home')
        }
    }

  return (
    <div style={{ width: '50%'}}>
        <div>
            <label>
                Email
            </label>
            <Input 
                placeholder='Masukan Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
            <label>
                Password
            </label>
            <Input 
                placeholder='Masukan Password' 
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <Button type="primary" onClick={() => postData()}>
                Login
            </Button>
        </div>
    </div>
  )
}
