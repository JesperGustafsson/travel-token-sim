import React from 'react'
import styled from 'styled-components'
import { Window, Input, Button } from '../Styles'

const Container = styled(Button)`
    margin: 0.75em;
`;


const Date = styled.div``;
const Time = styled.div``;

const Vehicle = ( { vehicleType, tokenID, handleClick, departureDate, departureTime } ) => {
    return (
        <Container onClick={ e => handleClick(vehicleType, tokenID)}>
            <Date>Jesper</Date>
            <Date>{tokenID}</Date>
            <Date>{vehicleType}</Date>
            <Date>{departureDate}</Date>
            <Time>{departureTime}</Time> 
        </Container>
    )
}

export default Vehicle