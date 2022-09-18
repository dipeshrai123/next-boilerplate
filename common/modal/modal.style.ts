import styled from 'styled-components'

import Theme from 'src/theme'

export const ModalContainer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
`

export const ModalContent = styled.div`
  min-width: 400px;
  max-width: 90vw;
  max-height: 80vh;
  overflow-y: auto;
  padding: ${Theme.space.$4};
  background: #ffffff;
  border-radius: ${Theme.radius.$default};
  box-shadow: ${Theme.shadows.$z6};
  text-align: left;
`
