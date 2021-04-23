import React, { useState, useEffect } from 'react'
import { Window, Input, Button, Break } from '../Styles'
import styled from 'styled-components'
import Vehicle from './Vehicle'
import { colorPalette } from '../colorPalette';

const WindowMod = styled(Window)`
    >input {
        margin-bottom: 1em;
    }
    >div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
`;

const VehicleButton = styled(Button)`
    padding: 2.0em;
    margin: 0.5em 0.5em;
`;

const VehicleList = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Section = styled.section`
`;



const VehicleCreator = () => {
    
    const [journeys, setJourneys] = useState([])
    const [tokenID, setTokenID] = useState("")
    const [departureTimestamp, setDepartureTimestamp] = useState("")
    const [arrivalTimestamp, setArrivalTimestamp] = useState("")

    const getJourneys = async () => {
        try {

            const result = await fetch(`http://localhost:4000/getCurrentTravels`)
            const jsonData = await result.json();
            setJourneys(jsonData)

        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getJourneys();
    }, [])

    const handleDeparture = async (vehicleType) => {
        try {
            const body = { vehicleType, tokenID, departureTimestamp }

            const result = await fetch(`http://localhost:4000/newDeparture`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            getJourneys();
        } catch (err) {
            console.error(err)
        }
    }

    const handleArrival = async (vehicleType, tokenID) => {
        try {
            const body = { vehicleType, tokenID, arrivalTimestamp }

            const result = await fetch(`http://localhost:4000/newArrival`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            getJourneys();

        } catch (err) {
            console.error(err)
        }
    }


    return (
        <WindowMod>
            <h2>Simulate Traffic</h2>
            <h3>Departure</h3>
            <p>Enter a timestamp (YYYY-MM-DD optional: hh:mm:ss) and token ID below and click on one of the buttons representing a vehicle. 
            This will simulate a token ID and vehicle being recognized as departing from the start position. Leaving the timestamp field empty will simulate the departure at current time.</p>
            <label>Enter timestamp below</label>
            <Input placeholder="date" value={departureTimestamp} onChange={e => setDepartureTimestamp(e.target.value)} />
            <label>Enter token ID below</label>
            <Input placeholder="token ID" value={tokenID} onChange={e => setTokenID(e.target.value)}/>
            <div>
                <VehicleButton onClick={e => handleDeparture('car')}>Car</VehicleButton>
                <VehicleButton onClick={e => handleDeparture('truck')}>Truck</VehicleButton>
                <VehicleButton onClick={e => handleDeparture('bike')}>Bike</VehicleButton>
            </div>
           
            <Break />
            <h3>Arrival</h3>
            <p>Enter a timestamp (YYYY-MM-DD hh:mm:ss) and click on one of the current passangers, 
            this will simulate a passanger arriving. Leaving the timestamp field empty will simulate the arrival at current time.
            </p>
            <label>Enter a timestamp below</label>
            <Input placeholder="date" />
            { journeys.length > 0 ? <h3>Current passangers</h3> 
                                  : <></>}

            <VehicleList>
            
            {
                journeys.map((journey) => {
                    console.log(`journey`, journey.departure)
                    const tempDepartureTimestamp = journey.departure
                    const departureDate = tempDepartureTimestamp.split('T')[0]
                    const departureTime = tempDepartureTimestamp.split('T')[1].split('.')[0]
                    console.log(`departureDate, departureTime`, departureDate, departureTime)

                    return <Vehicle handleClick={handleArrival} 
                        tokenID={journey.token_id} 
                        vehicleType={journey.vehicle} 
                        departureDate={departureDate}
                        departureTime={departureTime} />;
                })
            }
            </VehicleList>
            

        </WindowMod>
    )
}

export default VehicleCreator
