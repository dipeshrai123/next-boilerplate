import {useState, useCallback, useRef} from 'react'
import {
  useOutsideClick,
  AnimatedBlock,
  useMountedValue,
  interpolate,
  UseAnimatedValueConfig,
  AnimationConfigUtils
} from 'react-ui-animate'

type triggerElementArgType = {
  active: boolean
}

type Placement =
  | 'bottomleft'
  | 'bottomright'
  | 'bottommiddle'
  | 'topleft'
  | 'topright'
  | 'topmiddle'

const getPlacement: (pm: Placement) => React.CSSProperties = (
  placement: Placement
) => {
  switch (placement) {
    case 'bottomleft':
      return {left: 0, top: '100%', transformOrigin: '0% 0%'}
    case 'bottommiddle':
      return {left: '50%', top: '100%', transformOrigin: '0% 0%'}
    case 'bottomright':
      return {right: 0, top: '100%', transformOrigin: '100% 0%'}
    case 'topleft':
      return {left: 0, bottom: '100%', transformOrigin: '0% 100%'}
    case 'topmiddle':
      return {left: '50%', bottom: '100%', transformOrigin: '0% 100%'}
    case 'topright':
      return {right: 0, bottom: '100%', transformOrigin: '100% 100%'}
  }
}
export interface DropdownProps {
  children?: React.ReactNode
  trigger: (elementArg: triggerElementArgType) => React.ReactNode
  active?: boolean
  isAnimated?: boolean
  animationConfig?: UseAnimatedValueConfig
  style?: Omit<React.CSSProperties, 'transform' | 'position' | 'opacity'>
  placement?: Placement
  outDismiss?: boolean
  inDismiss?: boolean
  triggerToggle?: boolean
}

export const Dropdown = ({
  children,
  trigger,
  active = false,
  isAnimated = true,
  animationConfig = AnimationConfigUtils.POWER4,
  style,
  placement = 'bottomleft',
  outDismiss = true,
  inDismiss = false,
  triggerToggle = false
}: DropdownProps) => {
  const containerRef: React.RefObject<HTMLDivElement> =
    useRef<HTMLDivElement>(null)

  const [dropdownActive, setDropdownActive] = useState<boolean>(active)

  const dropdownAnimation = useMountedValue(dropdownActive, {
    from: 0,
    enter: 1,
    exit: 0,
    config: isAnimated ? animationConfig : {immediate: true}
  })

  const openDropdown: () => void = useCallback(() => {
    if (!dropdownActive) {
      setDropdownActive(true)
    }
  }, [dropdownActive])

  const closeDropdown: () => void = () => {
    setDropdownActive(false)
  }

  const toggleDropdown: () => void = useCallback(() => {
    if (dropdownActive) {
      closeDropdown()
    } else {
      openDropdown()
    }
  }, [dropdownActive])

  if (outDismiss) {
    useOutsideClick(containerRef, () => {
      closeDropdown()
    })
  }

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    display: 'inline-block'
  }

  const dropdownElementStyles: React.CSSProperties = {}
  const dropdownMenuStyles: any = {
    zIndex: 100,
    whiteSpace: 'nowrap',
    ...getPlacement(placement),
    ...style
  }

  const onClick = triggerToggle ? toggleDropdown : openDropdown

  const minScale = 0.95
  const maxScale = 1

  let translateX: number
  if (placement === 'bottommiddle' || placement === 'topmiddle') {
    translateX = -50
  } else {
    translateX = 0
  }

  return (
    <span ref={containerRef} style={containerStyles}>
      <span {...{onClick}} style={dropdownElementStyles}>
        {trigger({
          active: dropdownActive
        })}
      </span>
      {dropdownAnimation((animation, mounted) => {
        return (
          mounted && (
            <AnimatedBlock
              onClick={() => (inDismiss ? closeDropdown() : false)}
              style={{
                ...dropdownMenuStyles,
                position: 'absolute',
                opacity: animation.value,
                transform: interpolate(
                  animation.value,
                  [0, 1],
                  [
                    `scale(${minScale}) translateX(${translateX}%)`,
                    `scale(${maxScale}) translateX(${translateX}%)`
                  ]
                )
              }}
            >
              {children}
            </AnimatedBlock>
          )
        )
      })}
    </span>
  )
}
