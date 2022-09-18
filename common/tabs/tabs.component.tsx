import React, {
  Children,
  useMemo,
  ReactNode,
  useState,
  ReactElement,
  useEffect,
  useCallback,
  useRef,
  useImperativeHandle
} from 'react'
import {
  AnimationConfigUtils,
  makeAnimatedComponent,
  useAnimatedValue
} from 'react-ui-animate'

import {
  TabsStyled,
  TabsHeaderStyled,
  TabsPaneStyled,
  TabHeaderItemStyled,
  Indicator
} from './tabs.style'

export interface TabsProps {
  children: any
  selectedId?: string
  onTabChange?: (tabId: string) => void
  style?: React.CSSProperties
  indicatorStyle?: React.CSSProperties
}

export interface TabsRef {
  setActiveId: (tabId: string) => void
}

export const useTabsRef = () => {
  return useRef<TabsRef>(null)
}

const AnimatedIndicator = makeAnimatedComponent(Indicator)
export const Tabs = React.forwardRef<TabsRef, TabsProps>(
  (
    {children, selectedId, onTabChange, style, indicatorStyle}: TabsProps,
    ref
  ) => {
    const tabElements: Array<{
      id: string
      title: ReactNode
      element: ReactElement
    }> = useMemo(
      () =>
        Children.map(children, (element) => ({
          id: element.props.id,
          title: element.props.title,
          element
        })),
      []
    )

    const [activeId, setActiveId] = useState(selectedId ?? tabElements[0].id)
    const tabsMeasurements = useRef(Array(tabElements.length).fill(null))
    const tabWidth = useAnimatedValue(0, {
      ...AnimationConfigUtils.POWER4
    })
    const tabLeft = useAnimatedValue(0, {
      ...AnimationConfigUtils.POWER4
    })

    const activeTab = useMemo(
      () => tabElements.find((el) => el.id === activeId),
      [tabElements, activeId]
    )

    const handleTabChange = useCallback<
      (e: React.MouseEvent<HTMLSpanElement>, tabId: string) => void
    >((e, tabId) => {
      e.stopPropagation()
      setActiveId(tabId)
    }, [])

    useEffect(() => {
      onTabChange?.(activeId)

      const activeIndex = tabElements.findIndex((e) => e.id === activeId)
      tabWidth.value = tabsMeasurements.current[activeIndex].offsetWidth
      tabLeft.value = tabsMeasurements.current[activeIndex].offsetLeft
    }, [activeId])

    const tabsRef = useRef({setActiveId})
    useImperativeHandle(ref, () => tabsRef.current)

    if (!activeTab) {
      return null
    }

    return (
      <TabsStyled {...{style}}>
        <TabsHeaderStyled>
          {tabElements.map((element, index) => (
            <span
              ref={(r) => (tabsMeasurements.current[index] = r)}
              key={element.id}
            >
              {typeof element.title === 'string' ? (
                <TabHeaderItemStyled
                  onClick={(e) => handleTabChange(e, element.id)}
                >
                  {element.title}
                </TabHeaderItemStyled>
              ) : (
                <span onClick={(e) => handleTabChange(e, element.id)}>
                  {element.title}
                </span>
              )}
            </span>
          ))}

          <AnimatedIndicator
            style={{
              ...indicatorStyle,
              width: tabWidth.value,
              left: tabLeft.value
            }}
          />
        </TabsHeaderStyled>

        {activeTab.element}
      </TabsStyled>
    )
  }
)

export interface TabsPaneProps {
  title: ReactNode
  children: ReactNode
  id: string
  style?: React.CSSProperties
  className?: string
}

export const TabsPane = ({children, style, className}: TabsPaneProps) => {
  return <TabsPaneStyled {...{style, className}}>{children}</TabsPaneStyled>
}
