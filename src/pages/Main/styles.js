import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  .group {
    display: flex;
    flex: 1;

    input {
      flex: 1;
      border: 1px solid #eee;
      padding: 10px 15px;
      border-radius: 4px;
      font-size: 16px;

      &.error {
        border-color: #ff6e6e;
      }
    }
  }

  column-span.error {
    font-size: 0.8em;
    font-weight: bold;
    margin-top: 2px;
    color: #f44336;
  }

  .div-error {
    display: flex;
    flex: 1;
  }
`;

const rotate = keyframes`
from {
transform: rotate(0deg)
}
to {
  transform: rotate(360deg)
}
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }
  }

  a {
    color: #7159c1;
    text-decoration: none;
  }
`;

export const Error = styled.div`
  color: #f44336;
  font-size: 20spx;
  font-weigth: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
