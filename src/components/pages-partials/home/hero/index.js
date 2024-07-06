import Banner from '@/components/layout/banner'

export default function Hero() {
  return (
    <Banner
      secondaryTitle={'Book Your Appointments.'}
      // title={'Access Top Medical Professionals and Quality Care at Your Convenience.'}
      description={
        'Comprehensive Healthcare Services at Your Fingertips. Schedule Appointments with General Practitioners, Specialists, and More.'
      }
      // subDescription={
      //   " Unlock endless opportunities by joining our ever-growing community of experts, innovators, and visionaries. Our platform is designed to bridge the gap between budding talents and global opportunities. By being a part of our network, you get exclusive access to workshops, webinars, and mentorship programs that can propel your career forward."
      // }
      image="/svg/hero_section.svg" // give path here to image
      isHome={true}
      width={'50%'}
      position={'27%'}
    />
  )
}
