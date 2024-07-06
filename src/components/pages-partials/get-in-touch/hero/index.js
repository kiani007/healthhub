import Banner from '@/components/layout/banner'

export default function Hero() {
  return (
    <Banner
      secondaryTitle={'Get In Touch'}
      title={'Get In Touch'}
      description={
        'Get in touch for more information or to schedule an appointment. We are here to help. Reach out to us by phone, email, or chat - we offer flexible options to connect.'
      }
      image="/svg/getintouch.svg"
      path={'Home / '}
      width={'40%'}
      position={'30%'}
    />
  )
}
