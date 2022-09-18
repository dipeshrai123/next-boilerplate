import React, {
  useRef,
  forwardRef,
  useCallback,
  useImperativeHandle
} from 'react'
import {
  makeAnimatedComponent,
  useMountedValue,
  interpolate,
  UseAnimatedValueConfig,
  AnimationConfigUtils
} from 'react-ui-animate'

import {useDisableScroll} from 'src/hooks'

import {ModalContainer, ModalContent} from './modal.style'

import {ReactNode, useState} from 'react'

export interface ModalProps
  extends Pick<
    ModalDialogProps,
    'style' | 'isAnimated' | 'animationConfig' | 'disableScroll'
  > {
  children: ({close}: {close: () => void}) => React.ReactNode
  trigger?: ({active}: {active: boolean}) => ReactNode
  closeOnOverlayClick?: boolean
}

export interface ModalRef {
  open: () => void
  close: () => void
}

export const useModalRef = () => {
  return useRef<ModalRef>(null)
}

export const Modal = forwardRef<ModalRef, ModalProps>(
  ({trigger, children, closeOnOverlayClick = true, ...restProps}, ref) => {
    const [visible, setVisible] = useState(false)

    const open = useCallback(() => {
      setVisible(true)
    }, [])

    const close = useCallback(() => {
      setVisible(false)
    }, [])

    useImperativeHandle(
      ref,
      () => ({
        open,
        close
      }),
      [open, close]
    )

    return (
      <>
        {trigger && (
          <span
            onClick={(e) => {
              e.preventDefault()
              setVisible(true)
            }}
          >
            {trigger({active: visible})}
          </span>
        )}

        <ModalDialog
          visible={visible}
          onOutsideClick={
            closeOnOverlayClick ? () => setVisible(false) : undefined
          }
          {...restProps}
        >
          {children({close})}
        </ModalDialog>
      </>
    )
  }
)

const AnimatedModalContainer = makeAnimatedComponent(ModalContainer)
const AnimatedModalContent = makeAnimatedComponent(ModalContent)

interface ModalDialogProps {
  children: React.ReactNode
  visible: boolean
  onOutsideClick?: () => void
  style?: Omit<React.CSSProperties, 'transform'>
  isAnimated?: boolean
  animationConfig?: UseAnimatedValueConfig
  disableScroll?: boolean
}

const ModalDialog = ({
  children,
  visible,
  onOutsideClick,
  style,
  isAnimated = true,
  animationConfig = AnimationConfigUtils.POWER4,
  disableScroll = false
}: ModalDialogProps) => {
  const modalRef = useRef<HTMLElement>(null)
  const transition = useMountedValue(visible, {
    from: 0,
    enter: 1,
    exit: 0,
    config: isAnimated ? animationConfig : {immediate: true}
  })

  useDisableScroll(disableScroll && visible)

  return (
    <>
      {transition(
        (animated, mounted) =>
          mounted && (
            <AnimatedModalContainer
              onClick={(e: any) => {
                e.stopPropagation()
                onOutsideClick?.()
              }}
              style={{
                opacity: animated.value
              }}
            >
              <AnimatedModalContent
                ref={modalRef}
                onClick={(e: any) => e.stopPropagation()}
                style={{
                  ...style,
                  scale: interpolate(animated.value, [0, 1], [0.95, 1])
                }}
              >
                {children}
              </AnimatedModalContent>
            </AnimatedModalContainer>
          )
      )}
    </>
  )
}
