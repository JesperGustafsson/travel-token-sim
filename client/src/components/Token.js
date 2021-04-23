import React, { useState } from 'react'
import { Container, Window, Input, Button } from '../Styles'
import styled from 'styled-components'

const ContainerMod = styled(Container)`
    >input {
        margin-bottom: 1em;
    }
`;



const Token = ( {name, cost, image, desc} ) => {
    
    const [token, setToken] = useState("")
    
    const handlePurchase = () => {
        
    }

    return (
        <ContainerMod>
        </ContainerMod>
    )
}

export default Token
