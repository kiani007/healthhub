import Banner from '@/components/layout/banner'

export default function Hero() {
  return (
    <Banner
      secondaryTitle={'Services'}
      title={'Our Services'}
      description={
        'Empower your health journey with our suite of services: securely manage records, schedule appointments (in some regions), track medications (limited regions), access credible health information, and take proactive steps with health risk assessments. Visit our page to learn more!'
      }
      image="/svg/group-of-people.svg"
      path={'Home / '}
      width={'40%'}
      position={'30%'}
    />
  )
}
