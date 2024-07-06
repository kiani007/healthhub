import SharedLayout from '@/components/layout/shared-layout'
import Content from './content'
import Hero from './hero'
import Team from './team'

const AboutUs = () => {
  return (
    <SharedLayout title="About us">
      <Hero />
      <Content />

      <Team />
    </SharedLayout>
  )
}

export default AboutUs
