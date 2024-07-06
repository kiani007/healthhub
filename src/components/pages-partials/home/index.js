import SharedLayout from '@/components/layout/shared-layout'
import Welcome from './welcome'
import Hero from './hero'
import Cards from './cards'
import Line from './line'
import Testimonial from './testimonial'
import Result from './result'

// const Hero = dynamic(async () => await import('./hero'))

const Home = () => {
  return (
    <SharedLayout title="Home">
      <Hero />
      <Cards />
      <Welcome />
      <Result />
      <Line />
      <Testimonial />
    </SharedLayout>
  )
}

export default Home
