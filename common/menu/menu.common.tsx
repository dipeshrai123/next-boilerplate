import {Dropdown, DropdownProps} from 'src/common/dropdown'

import {
  StyledMenuContainer,
  MenuItemProps,
  StyledMenuItem,
  StyledMenuSeparator
} from './menu.style'

interface MenuProps extends DropdownProps {
  className?: string
  containerStyle?: React.CSSProperties
}

export const Menu = (props: MenuProps) => {
  const {children, containerStyle, style, className, ...rest} = props
  return (
    <Dropdown {...rest} style={containerStyle}>
      <StyledMenuContainer {...{style, className}}>
        {children}
      </StyledMenuContainer>
    </Dropdown>
  )
}

export const MenuItem = (props: MenuItemProps) => {
  const {children, danger = false, onClick, style, className} = props
  return (
    <StyledMenuItem {...{danger, onClick, style, className}}>
      {children}
    </StyledMenuItem>
  )
}

export const MenuSeparator = () => {
  return <StyledMenuSeparator />
}
