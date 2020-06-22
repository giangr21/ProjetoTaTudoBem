import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  button {
    background: #8bc6ec;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e38;
    width: 100%;
    font-weight: 500;
    /* margin-top: 16px; */
    transition: background-color 0.2s;
  }
  /* margin: auto; */
`;

export const Video = styled.video`
  border: 1px solid black;
  width: 50%;
  height: 50%;
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
