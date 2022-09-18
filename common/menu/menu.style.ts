import styled from 'styled-components'

import Theme from 'src/theme'

export const StyledMenuContainer = styled.div`
  background-color: #ffffff;
  padding: 6px 0px;
  box-shadow: ${Theme.shadows.$z2};
  border: ${Theme.colors.$borderPrimary};
  border-radius: ${Theme.radius.$default};
  margin: 0px;
`

export interface MenuItemProps {
  children: React.ReactNode
  danger?: boolean
  style?: React.CSSProperties
  onClick: () => void
  className?: string
}

export const StyledMenuItem = styled.button<Pick<MenuItemProps, 'danger'>>`
  width: 100%;
  padding: ${Theme.space.$3} ${Theme.space.$6};
  display: block;
  background-color: white;
  border: none;
  outline: none;
  text-align: left;
  cursor: pointer;
  color: ${(props) =>
    props.danger ? Theme.colors.$error : Theme.colors.$black};
  transition: background-color 0.1s;

  &:hover {
    background-color: ${Theme.colors.$backgroundSecondary};
  }
  &:active {
    background-color: ${Theme.colors.$gray200};
  }
  &:focus {
    outline: ${Theme.colors.$borderInput};
  }
  &.danger {
    color: ${Theme.colors.$error};
  }
`
export const StyledMenuSeparator = styled.div`
  width: 100%;
  border-bottom: 1px solid ${Theme.colors.$borderPrimary};
  margin: 5px 0px;
`
