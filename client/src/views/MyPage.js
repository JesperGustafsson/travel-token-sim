import React, { useEffect, useState } from 'react'
import { Container, Window, Break, Input, Button } from '../Styles'
import TravelTable from '../components/TravelTable'
import styled from 'styled-components'
import Token from '../components/Token'

const ContainerMod = styled(Container)`

`;

const MyPage = () => {

    const [token, setToken] = useState("")
    const [user, setUser] = useState("re")
    const [travels, setTravels] = useState([])
    const [billings, setBillings] = useState([])
    
    const getUser = async () => {
        
        const refreshToken = localStorage.user;

        const body = { refreshToken }

        var result = await fetch("http://localhost:4000/getUsernameFromJWT",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const username = await result.json();
        setUser(username);

        result = await fetch(`http://localhost:4000/getCustomerTravels?customerID=${username}`)
        const jsonData = await result.json();
        setTravels(jsonData);

        getBillings(username);


    }

    const getBillings = async (customerID) => {
        



        const result = await fetch(`http://localhost:4000/getCustomerBillings?customerID=${customerID}`)

        const jsonData = await result.json();
        setBillings(jsonData);


    }

    const getTravels = async () => {
        

        const result = await fetch(`http://localhost:4000/getCustomerTravels?customerID=${user}`)
        const jsonData = await result.json();



    }

    const handlePurchase = async () => {

        const refreshToken = localStorage.user;

        const body = { customerID: user, tokenID: token }

        const result = await fetch("http://localhost:4000/linkTokenToCustomer",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const jsonData = await result.json();
        setUser(jsonData);
    }

    useEffect(() => {
        getUser()
        //getTravels()
        //getBillings();

    }, [])

    const tableHeads = ["A", "B", "C", "D"];
    const tableData = [{"A": 32131231, "B": 233333, "C": 333332, "D": 312312},
                       {"A": 322, "B": 4, "C": 9},
                       {"A": 5, "B": 6, "C": 2, "D": 3}];


    const handleLogOut = async () => {
        try {
            const body = { refreshToken: localStorage.user }

            const result = await fetch(`http://localhost:4000/logout`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

            localStorage.clear();

            window.location = "/"
        } catch (err) {
            console.error(err)
        }    
    }

    return (
        <ContainerMod>
            <Window>
                <Button onClick={e => handleLogOut()}>Log out</Button>

                <h2>Welcome back, {user}</h2>
                <p>This is your page where you can view your billing and travel history as well as linking a token to your user.</p>
            </Window>
            <Window>
                <h2>Billings</h2>
                {
                    billings.length > 0 ? <TravelTable columns={Object.keys(billings[0])} data={billings} />
                                        : <i>You have no billing history to display</i>

                }

                <Break />

                <h2>Recent journeys</h2>
                {
                    travels.length > 0 ? <TravelTable columns={Object.keys(travels[0])} data={travels} />
                                        : <i>You have no travel history to display</i>

                }
                
                </Window>
                
            <Window>
                <h2>Purchase a travel token</h2>
                <p>Enter the ID of the token you want to link your user to. If no token by that ID exists, it will be created and linked to your user.</p>
                <Input placeholder ="Enter" value={token} onChange={e => setToken(e.target.value)}/>
                <Button onClick = {e => handlePurchase()}>Purchase Token</Button>
            </Window>
        </ContainerMod>
    )
}

export default MyPage
