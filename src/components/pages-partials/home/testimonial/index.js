import React from 'react'
import Carousel from 'react-grid-carousel'

const testimonials = [
  {
    image: '/svg/comma.svg',
    alt: 'comma',
    quote:
      '" This app has been a game-changer for managing my chronic condition. I can track my symptoms, medications, and appointments all in one place. It made a huge difference in my well-being "',
    clientImage: '/img/c1.png',
    clientAlt: 'client 2',
    clientName: 'Karen. K',
    clientPosition: 'Director',
  },
  {
    image: '/svg/comma.svg',
    alt: 'comma',
    quote:
      '"I love the convenience of being able to schedule appointments, refill prescriptions, and message my doctor right from my phone. It saves me so much time and hassle."',
    clientImage: '/img/c3.png',
    clientAlt: 'client 2',
    clientName: 'Luis',
    clientPosition: 'CTO',
  },
  {
    image: '/svg/comma.svg',
    alt: 'comma',
    quote:
      '"The secure messaging feature has made communication with my doctor so much easier. I can now get answers to my questions quickly and efficiently." "',
    clientImage: '/img/c3.png',
    clientAlt: 'client2',
    clientName: 'Alex',
    clientPosition: 'HEAD',
  },
]
export default function Testimonial() {
  return (
    <div className="bg-theme-gray w-full py-4   lg:py-0">
      <div className="max-w-7xl mx-auto  py-auto h-full w-full  ">
        <div className="relative flex lg:flex-row flex-col justify-center lg:h-full lg:mx-0 mx-[2rem] lg:py-0 py-4 h-[80vh] ">
          <div className="bg-cover bg-center lg:block hidden ">
            <img src="/svg/globle.svg " alt="" />
          </div>
          <h3 className="absolute  lg:left-[28rem]  z-10  text-theme-blue md:text-3xl text-xl font-bold top-5 mb-[20rem]  ">
            Welcome to Testimonial
          </h3>
          <div className="flex flex-row lg:items-center h-full absolute lg:top-0 top-[3.5rem]  left-0 z-10 flex-wrap ">
            <div className="flex flex-col lg:space-y-5 space-y-2  ">
              <h1 className="text-[32px] font-[Georgia] font-bold lg:w-2/3 w-3/4">
                Hear from Our Happy patients
              </h1>
              <p className="lg:w-2/4 text-sm font-normal  lg:leading-7">
                Read what performers like you have to say about our platform and
                the impact it has had on their careers.
              </p>
            </div>
          </div>
          <div className="absolute  lg:ml-[40rem]">
            <div className="h-full md:w-full relative">
              <div className="absolutes  md:w-full h-full sm:mt-[10rem] mt-[20rem] md:mt-0 z-20  md:max-lg:ml-[10rem] md:max-lg:w-9/12  ">
                <Carousel
                  cols={1}
                  rows={1}
                  loop={true}
                  showDots={true}
                  dotColorActive={'#2b72ee'}
                  autoplay={2000}
                  scrollSnap={true}
                  hideArrow={false}
                  gap={30}
                  responsiveLayout={[
                    {
                      breakpoint: 670,
                      cols: 1,
                      showDots: true,
                    },
                  ]}
                >
                  {testimonials.map((testimonial, index) => (
                    <Carousel.Item key={index}>
                      <div className="flex flex-col space-y-3 justify-center items-center w-full md:max-lg:w-11/12 py-12  mt-[5rem] bg-theme-white lg:mt-[7rem] mb-[6rem] rounded-tr-[5rem] rounded-bl-[5rem]">
                        <div>
                          <img src={testimonial.image} alt={testimonial.alt} />
                        </div>
                        <p className=" text-xs md:text-base px-2 sm:px-7">
                          {testimonial.quote}
                        </p>
                        <div className="flex flex-col absolute justify-center items-center space-y-3 md:bottom-0 w-auto bottom-0 z-30  ">
                          <div className="z-30 w-[50px] h-auto rounded-[3rem]">
                            <img
                              src={testimonial.clientImage}
                              alt={testimonial.clientAlt}
                              className="rounded-[3rem]"
                            />
                          </div>
                          <h5 className="text-theme-blue text-base font-bold">
                            {testimonial.clientName}
                          </h5>
                          <p>{testimonial.clientPosition}</p>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
