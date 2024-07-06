import { useState } from 'react'
import AnimatedParticles from '../animated-particles'
import { useRouter } from 'next/router'

export default function Banner({
  title,
  description,
  subDescription,
  image,
  secondaryTitle,
  path,
  isHome,
  width,
  position,
}) {
  const [learnMore, setLearnMore] = useState(false)
  const router = useRouter()
  return (
    <div className="overflow-hidden ">
      <main>
        <div
          className={`flex  ${
            learnMore
              ? 'h-[1180px] md:h-[750px] sm:h-[800px]'
              : 'h-[730px] md:h-[650px] sm:h-[650px]'
          }   relative sm:static`}
        >
          <div className="bg-theme-gray lg:w-full w-3/5 flex sm:items-center ">
            <div className="container">
              <div className="2xl:ml-72 lg:ml-10 ml-4 lg:mt-5 mt-24 ">
                {isHome ? (
                  <>
                    <div className="flex flex-col">
                      <h1 className="text-theme-blue lg:text-5xl text-3xl font-bold ">
                        {secondaryTitle}
                      </h1>
                      <h1 className="lg:pt-2  text-theme-blue  text-3xl font-bold">
                        {title}
                      </h1>

                      <p className="text-black text-lg font-sans lg:pt-12 pt-4 lg:w-[58vh] w-[95%] font-normal leading-normal sm:max-md:w-[70%]">
                        {description}
                      </p>
                    </div>
                    <div className="flex flex-row  mt-8">
                      <button
                        className="border border-color p-2 lg:px-5 lg:py-3 rounded-lg bg-theme-blue text-theme-white font-sans lg:text-base text-xs lg:font-bold bg-theme-white-hover text-theme-blue-hover"
                        onClick={() => {
                          router.push('/contact')
                        }}
                      >
                        Book Your Appointment
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col space-y-5 justify-center">
                    {secondaryTitle && (
                      <p className="font-bold text-xl text-theme-blue">
                        {' '}
                        {path}{' '}
                        <span className="text-theme-black ">
                          {secondaryTitle}
                        </span>{' '}
                      </p>
                    )}
                    <h1 className="text-theme-blue  font-serif lg:text-5xl text-3xl font-bold ">
                      {title}
                    </h1>
                    <p className="font-normal text-base lg:w-3/4 ">
                      {description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="2xl:w-10/12 lg:w-full w-7/12 bg-theme-blue flex relative">
            <AnimatedParticles id="ts-particles-banner" />
            <div className="absolute w-full hidden sm:flex h-full items-center justify-center ">
              <img src={image} alt="banner-image" />
            </div>
          </div>

          {isHome ? (
            <>
              <div
                className={`absolute bottom-0 right-[30%] block sm:hidden w-[30%]  `}
              >
                {' '}
                <img src={image} alt="banner-image" />
              </div>
            </>
          ) : (
            <div
              className={`absolute bottom-9 right-[${position}] block sm:hidden w-[${width}] `}
            >
              <img src={image} alt="banner-image" />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
