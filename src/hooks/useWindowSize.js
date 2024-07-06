import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      })
    }

    window?.addEventListener('resize', handleResize)

    handleResize()

    return () => window?.removeEventListener('resize', handleResize)
  }, [])

  return {
    windowSize,
    sm: windowSize?.width < 640,
    md: windowSize?.width >= 640 && windowSize?.width < 768,
    lg: windowSize?.width >= 768 && windowSize?.width < 1024,
    xl: windowSize?.width >= 1024 && windowSize?.width < 1280,
  }
}

export default useWindowSize
