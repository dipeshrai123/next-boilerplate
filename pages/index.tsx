import {useEffect} from 'react'
import {useRouter} from 'next/router'

const Home = () => {
  const {replace} = useRouter()

  useEffect(() => {
    replace('/login')
  }, [replace])

  return null
}

export default Home
