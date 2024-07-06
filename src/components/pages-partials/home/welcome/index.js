import { useState } from 'react'

export default function Welcome() {
  const [learnMore, setLearnMore] = useState(false)
  return (
    <div className="bg-theme-white">
      <div className="max-w-7xl  mx-auto my-5 ">
        <h5 className="text-center text-2xl sm:text-4xl mb-4 font-bold text-theme-blue pb-6 font-sans mx-auto w-full">
          Welcome to HealthHub
        </h5>
        <div className="flex lg:flex-row flex-col">
          <div className="lg:ml-4 mx-auto lg:px-0 px-10 lg:mx-0  ">
            <img
              src="/svg/group-of-people.svg "
              alt="group picture "
              width={552}
              height={371}
              className="lg:ml-28 rounded-tr-[3rem] rounded-bl-[3rem] "
            />
          </div>
          <div className="flex-1 flex-col ml-12 mt-20 lg:mt-0 ">
            <h1 className=" text-3xl lg:w-7/12 w-10/12 font-[Georgia] font-bold not-italic leading-none pb-6">
              Your Health, Our Priority
            </h1>
            <p className="lg:w-10/12 w-11/12 text-lg font-sans font-normal pb-9 leading-normal text-justify">
              Our mission is to provide you with accessible and comprehensive
              healthcare services. Book appointments with experienced healthcare
              professionals and receive quality care tailored to your needs.
              Join us today and take the first step towards better health.
            </p>
            <div>
              <button
                className="border border-color p-2 lg:px-7 lg:py-3 px-6 py-3 rounded-lg bg-theme-blue text-theme-white font-sans lg:text-base text-sm font-bold bg-theme-white-hover text-theme-blue-hover"
                onClick={() => setLearnMore(!learnMore)}
              >
                {!learnMore ? 'Learn More' : 'Learn Less'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}