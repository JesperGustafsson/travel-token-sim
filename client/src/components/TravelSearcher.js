import React, { useState } from 'react'
import { Window, Input, Button } from '../Styles'
import styled from 'styled-components'
import Table from './TravelTable'


const WindowMod = styled(Window)`
`;

const InputWithButton = styled.div`
    display: flex;

`;


const TravelSearcher = () => {

    
    const tableHeads = ["A", "B", "C", "D"];
    const tableData = [{"A": 32131231, "B": 233333, "C": 333332, "D": 312312},
                       {"A": 322, "B": 4, "C": 9},
                       {"A": 5, "B": 6, "C": 2, "D": 3}];

    const [tokenID, setTokenID] = useState("")
    const [customer, setCustomer] = useState("")
    const [searchedTravels, setSearchedTravels] = useState([]);
    const [tokenSearch, setTokenSearch] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const searchByToken = async () => {
        try {
            const body = { tokenID }


            console.log(`tokenID`, tokenID)
    
            const result = await fetch(`http://localhost:4000/getTokenTravels?tokenID=${tokenID}`)

            const travels = await result.json();
            setSearchedTravels(travels)
            setTokenSearch(true);
            setSearchTerm(tokenID)
            


        } catch (err) {
            console.error(err)
        }

    }

    const searchByCustomer = async () => {
        try {
            const result = await fetch(`http://localhost:4000/getCustomerTravels?customerID=${customer}`)

            const travels = await result.json();
           
            setTokenSearch(false);
            setSearchedTravels(travels)
            setSearchTerm(customer)

        } catch (err) {
            console.error(err)
        }
    }
    

    return (
        <WindowMod>
            <h2>Travel Searcher</h2>
            <p>Search for the completed travels associated with a user or token by searching for the desired user or token.</p>
            <InputWithButton>
                <Input placeholder = 'Enter here' value={tokenID} onChange={e=>setTokenID(e.target.value)}></Input>
                <Button onClick={e => searchByToken()}>Search using token ID</Button>
            </InputWithButton>

            <InputWithButton>
                <Input placeholder = 'Enter here' value={customer} onChange={e => setCustomer(e.target.value)}></Input>
                <Button onClick={e => searchByCustomer()}>Search using customer ID</Button>
            </InputWithButton>

            {
                searchedTravels.length > 0 ? 
                <>
                    <h3>Travels associated with {tokenSearch ? `token '${searchTerm}'` : `customer '${searchTerm}'`}</h3>
                    <Table columns = {Object.keys(searchedTravels[0])} data = {searchedTravels}/>
                </> : searchTerm ? 
                    <h3>There are no travels associated with {tokenSearch ? `token '${searchTerm}'` : `customer '${searchTerm}'`}</h3>
                    :
                    <></>
            }
        </WindowMod>
    )
}

export default TravelSearcher
