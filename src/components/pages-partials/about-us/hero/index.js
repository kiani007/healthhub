import Banner from '@/components/layout/banner'

export default function Hero() {
  return (
    <Banner
      secondaryTitle={'About us'}
      title={'About Us'}
      description={
        'We connect talent with opportunity. With our experience and extensive network, we make recruitment fast and efficient. Our dedicated team ensures the perfect match for both candidates and employers. Let us help you find your dream career or the ideal candidate.'
      }
      image="/svg/hero-about.svg"
      path={'Home / '}
      width={'40%'}
      position={'30%'}
    />
  )
}
