import React from 'react'
import styled from 'styled-components'
import { colorPalette } from '../colorPalette'
import { constants } from '../constants';

const OuterContainer = styled.div`
    background: ${colorPalette.primary};
    height: 3em;
    display: flex;
    justify-content: center;
    border-bottom: 1px solid black;
    box-shadow: 0em 0em 1em 0.125em black;
`;

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    width: ${constants.pageWidth};
`;

const LinkGroup = styled.ul`
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
`;

const Link = styled.a`
    color: ${colorPalette.link};
    font-size: 28px;
    padding: 0.5em;
    text-decoration: none;
    font-weight: 600;
    :hover {
    color: ${colorPalette.linkHover};
    }
`;


const Navbar = () => {

    const loggedIn = localStorage.user;

    return (
        <OuterContainer>
        <Container>
            <LinkGroup>
                <Link href="/">Home</Link>
            </LinkGroup>
            <LinkGroup>
                <Link href="/simulator">Simulator</Link>
            </LinkGroup>
            <LinkGroup>
            {
                loggedIn ? <Link href="/mypage">My Page</Link>
                         : <Link href="/login">Log in</Link>
            }
            </LinkGroup>
        </Container>
        </OuterContainer>
    )
}

export default Navbar