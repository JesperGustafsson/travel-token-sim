import React from 'react'
import { Window, Container, Break } from '../Styles'

const Home = () => {
    return (
        <Container>
          <Window>
            <h1>Welcome to TripToken!</h1>
            <p>
              This is a prototype website that simulates and records travels of a token between two points. It is built using an Express REST-API along with a PostgreSQL database back-end with a React front-end. Authentication is implemented using JSON Web Tokens.
            </p>
            <p>
              Using the <b>Simulator</b> page you can simulate departure and arrivals for a desired token. You can also search and view all travels associated with a token or a customer.
            </p>
            <p>
              Using the <b>Log in</b> page you may log-in or register as a new user. Once logged in, the log-in link will be replaced with one to your user page. Here you can log-out as well as create and link a token to your user. You will also be able to see your travel history along with your billing history. 
            </p>
            <Break />
            <h2>Tools used</h2>
            <p>
              HTML, CSS, JavaScript, React, Styled Components, Express, Node.js, JSON Web Token, PostgreSQL
            </p>
            <a href="https://jespergustafsson.github.io/portfolio/">My Portfolio</a>
          </Window>
        </Container>
    )
}

export default Home