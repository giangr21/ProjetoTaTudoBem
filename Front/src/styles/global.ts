import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box
}
body {
  -webkit-font-smoothing: antialiased;
  background-color: #D9AFD9;
  background-image: linear-gradient(0deg, #D9AFD9 0%, #97D9E1 100%);
}

body, input, button {
  font: 16px Roboto, sans-serif;
}
/* #root {
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;
} */
button {
  cursor: pointer;
}
`;
