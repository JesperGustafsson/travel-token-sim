import React, { useState } from 'react'
import { Window, Input, Button } from '../Styles'
import { constants } from '../constants'
import styled from 'styled-components'

const WindowMod = styled(Window)`
    width: ${constants.pageWidthHalf};

    >h2, input, button {
        margin-bottom: 1em;
    }
`;


const Login = () => {

    const handleLogin = async () => {
        try {
            const body = { username, password }

            const result = await fetch(`http://localhost:4000/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            const jsonData = await result.json();

            localStorage.user = jsonData.refreshToken;
            window.location = "/MyPage"
        } catch (err) {
            console.error(err)
        }    
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <WindowMod >
            <h2>Log in</h2>
            <Input placeholder={`username`} value={username} onChange={e => setUsername(e.target.value)} />
            <Input placeholder={`password`} value={password} onChange={e => setPassword(e.target.value)} type="password" />

            <Button onClick={e => handleLogin()}>Log in</Button>
            <a href="/register">Click here to register instead</a>
        </WindowMod>
    )
}

export default Login