import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body{
        background: #FBFBFB;
        color: black;
    }

    body, input, text-area, button{
        font-family: 'Nunito Sans', sans-serif;
        font-weight: 400;
        font-size: 1rem;
    }
`;
