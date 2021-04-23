import React from 'react'
import styled from 'styled-components'
import { colorPalette } from './colorPalette';
import { constants } from './constants';

export const Window = styled.div`
    border: 1px solid ${colorPalette.primary};
    border-top: 1.75em solid ${colorPalette.primary};
    background: ${colorPalette.background};
    width: 100%;
    padding: 1.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1em;


    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */

    @media (max-width: 800px) {
        padding: 1em;
    }
`;

export const Container = styled.div`
    width: ${constants.pageWidth};
    max-width: 95vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MainContainer = styled.div`
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const Input = styled.input`
    padding: 0.5em 1em; 
    margin: 0.25em 0em;
`;

export const Button = styled.button`
    padding: 0.75em;
    max-width: 8em;
    background: ${colorPalette.secondary};
    border: 1px solid ${colorPalette.secondaryDark};
    margin: 0.25em 0em;

`;

export const Break = styled.div`
    height: 1px;
    width: 100%;
    background: ${colorPalette.primaryDark};
    margin: 2em 0em;
`;