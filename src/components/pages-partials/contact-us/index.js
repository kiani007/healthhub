import SharedLayout from '@/components/layout/shared-layout'
import Hero from './hero'
import GetInTouch from './get-in-touch'
import Map from './map'
const ContactUs = () => {
  return (
    <SharedLayout title="Contact">
      <Hero />
      <GetInTouch />
      <Map />
    </SharedLayout>
  )
}

export default ContactUs
