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


const Register = () => {

    const handleRegister = async () => {
        try {
            const body = { username, password }

            const result = await fetch(`http://localhost:4000/register`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            window.location = "/login"

        } catch (err) {
            console.error(err)
        }    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <WindowMod >
            <h2>Register</h2>
            <Input placeholder={`username`} value={username} onChange={e => setUsername(e.target.value)} />
            <Input placeholder={`password`} value={password} onChange={e => setPassword(e.target.value)} type="password" />

            <Button onClick={e => handleRegister()}>Register</Button>
            <a href="/login">Click here to login instead</a>
        </WindowMod>
    )
}

export default Register
