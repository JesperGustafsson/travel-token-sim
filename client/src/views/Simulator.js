import React from 'react'
import { Window, Container } from '../Styles'
import styled from 'styled-components'
import TravelSearcher from '../components/TravelSearcher'
import VehicleCreator from '../components/VehicleCreator'

const ContainerMod = styled(Container)`
  //align-items: start;
`;

const WindowColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;


const Simulator = () => {
    return (
      <>
        <ContainerMod>
            <Window>
              <h1>Simulator</h1>
              <p>On this page you may simulate departures and arrivals. </p>
              <p>In the <b>Simulate traffic</b> window you may under <i>Departure</i> enter a token-id and a timestamp and then clicking on the vehicle you want to simulate leaving. A departured vehicle/token will then be displayed under <i>Current passangers</i> below <i>Arrival</i>. Under <i>Arrival</i> you may enter a timestamp and click on one of the tokens, represented by a button, to simulate arrival. This will remove the vehicle/token from the <i>Current passangers</i>, and the database will be updated accordingly. </p>
              <p>In the <b>Travel Search</b> window, you may search for all the completed journeys either by searching for a token ID or searching for a username.</p>
            </Window>
            <VehicleCreator />

            <TravelSearcher />

        </ContainerMod>
      </>
    )
}

export default Simulator