import styled from 'styled-components'

import Theme from 'src/theme'

export const TabsStyled = styled.div``
export const TabsHeaderStyled = styled.div`
  display: flex;
  position: relative;
`
export const TabHeaderItemStyled = styled.div`
  padding: ${Theme.space.$2};
  cursor: pointer;
`
export const TabsPaneStyled = styled.div``

export const Indicator = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${Theme.colors.$primary};
  height: 4px;
  z-index: 10;
  pointer-events: none;
`
