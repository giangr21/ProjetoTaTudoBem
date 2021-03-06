import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;


`;

export const Header = styled.div`
  display: flex;
  align-items: flex-end;

  button {
    padding: 20px;
      margin-left: auto;
      background: transparent;
      border: 0;

      svg {
        color: #999591;
        width: 20px;
        height: 20px;
      }
    }
`

export const Content = styled.div`
  width: 100%;
  max-width: 500px;
  text-align: center;
  /* display: flex; */

  .flex {
    display: flex;
  }

  .m5 {
    margin: 5px 20px;
  }

  button {
    background: #8bc6ec;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;
  }

  > a {
    color: #fff;
    display: block;
    margin-top: 24px;
    text-decoration: none;
    transition: color 0.2s;
    align-items: center;

    svg {
      margin-right: 16px;
    }
  }
`;
