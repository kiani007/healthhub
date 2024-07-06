import Banner from '@/components/layout/banner'

export default function Hero() {
  return (
    <Banner
      secondaryTitle={'Contact'}
      title={'Contact'}
      description={
        'Have questions about your health or want to schedule an appointment? Our dedicated team is here to guide you.  Reach out by phone, email, or chat - we offer flexible options to connect!'
      }
      image="/svg/contact.svg"
      path={'Home / '}
      width={'80%'}
      position={'20%'}
    />
  )
}
