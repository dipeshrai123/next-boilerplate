import styled, {css} from 'styled-components'

import Theme from 'src/theme'

import {colors} from './constants'
import {StyledButtonProps} from './button.type'

const {colorOptions, variantOptions} = colors

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  padding: ${Theme.space.$2} ${Theme.space.$4};
  min-width: 115px;
  height: 36px;
  background-color: ${colors.default.backgroundColor};
  box-shadow: ${Theme.shadows.$z1};
  border: 1px solid ${colors.light.lightBorderColor};
  outline: none;
  border-radius: ${Theme.radius.$default};
  font-weight: bold;
  cursor: pointer;
  color: ${colors.light.defaultTextColor};
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;
  z-index: 9;
  ${({color, variant}) =>
    variant && (variant === 'text' || variant === 'outlined')
      ? color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].backgroundColor};
          color: ${colorOptions[color].active};
          &:hover {
            background-color: ${colorOptions[color].hover};
          }
        `
      : color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].color};
          color: ${colorOptions[color].backgroundColor};
          &:hover {
            background-color: ${colorOptions[color].darkHover};
          }
        `}

  ${({variant, color}) =>
    variant && variantOptions[variant] && variant === 'outlined'
      ? css`
          border: 1px solid ${colorOptions[color || 'primary'].color};
        `
      : css`
          border: none;
        `}

    ${({variant}) =>
    variant &&
    variantOptions[variant] &&
    variant === 'text' &&
    css`
      box-shadow: 0 0 0 0;
    `}
`

const DisabledStyledButton = styled(StyledButton)<StyledButtonProps>`
  background-color: ${variantOptions['contained'].disabledColor};
  border: 1px solid ${variantOptions['contained'].disabledColor};

  color: ${variantOptions['contained'].disabledBg};
  &:hover {
    background-color: ${variantOptions['contained'].disabledColor};
    border: 1px solid ${variantOptions['contained'].disabledColor};

    color: ${variantOptions['contained'].disabledBg};
  }

  ${({variant}) =>
    variant &&
    variantOptions[variant] &&
    css`
      background-color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledColor}`
        : `${variantOptions[variant].disabledBg}`};

      color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledBg}`
        : `${variantOptions[variant].disabledColor}`};
      border: ${variant === 'outlined'
        ? `1px solid ${variantOptions[variant].disabledColor}`
        : `none`};
      &:hover {
        background-color: ${variant === 'contained'
          ? `${variantOptions[variant].disabledColor}`
          : `${variantOptions[variant].disabledBg}`};

        color: ${variant === 'contained'
          ? `${variantOptions[variant].disabledBg}`
          : `${variantOptions[variant].disabledColor}`};
        border: ${variant === 'outlined'
          ? `1px solid ${variantOptions[variant].disabledColor}`
          : `none`};
      }
    `}
`

const IconStyledButton = styled.button<StyledButtonProps>`
  padding: 10px;
  margin: 10px;
  height: 36px;
  width: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
  border: none;
  outline: none;
  border-radius: 50%;
  font-weight: bold;
  font-size: 20px;
  cursor: pointer;
  color: ${colors.light.defaultTextColor};
  transition: background-color 0.3s;
  position: relative;
  overflow: hidden;
  ${({color, variant}) =>
    variant && (variant === 'text' || variant === 'outlined')
      ? color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].backgroundColor};
          color: ${colorOptions[color].color};
        `
      : color &&
        colorOptions[color] &&
        css`
          background-color: ${colorOptions[color].color};
          color: ${colorOptions[color].backgroundColor};
        `}

  ${({variant, color}) =>
    variant && variantOptions[variant] && variant === 'outlined'
      ? css`
          border: 1px solid ${colorOptions[color || 'primary'].color};
        `
      : css`
          border: none;
        `}
`

const DisabledIconStyledButton = styled(IconStyledButton)`
  padding: 0px;
  ${({variant}) =>
    variant &&
    variantOptions[variant] &&
    css`
      background-color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledColor}`
        : `${variantOptions[variant].disabledBg}`};
      color: ${variant === 'contained'
        ? `${variantOptions[variant].disabledBg}`
        : `${variantOptions[variant].disabledColor}`};
      border: ${variant === 'outlined'
        ? `1px solid ${variantOptions[variant].disabledBg}`
        : `none`};
    `}
`

const ButtonText = styled.div`
  position: relative;
  z-index: 11;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-smooth: 10em;
  padding: 0;
  margin: 0;
  flex: 1;
`

const RippleContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 9;
`

const RippleItem = styled.div<StyledButtonProps>`
  ${({color, variant}) =>
    color &&
    colorOptions[color] &&
    css`
      background-color: ${variant === 'text' || variant === 'outlined'
        ? colorOptions[color].color
        : colorOptions[color].backgroundColor};
    `}
`

export {
  StyledButton,
  DisabledStyledButton,
  IconStyledButton,
  ButtonText,
  DisabledIconStyledButton,
  RippleContainer,
  RippleItem
}
