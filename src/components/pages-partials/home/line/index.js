import React, { useState } from 'react'
import CountUp from 'react-countup'
import ScrollTrigger from 'react-scroll-trigger'

export default function Line() {
  const [counterOn, setCounterOn] = useState(false)
  return (
    <ScrollTrigger
      onEnter={() => setCounterOn(true)}
      onExit={() => setCounterOn(true)}
    >
      <div className="bg-theme-white">
        <div className="max-w-7xl  mx-auto  my-10">
          <div className="bg-theme-blue md:h-[9rem] md:w-[88%] w-[15rem] justify-center  mx-auto h-[520px] flex relative">
            <div className="flex md:flex-row flex-col  justify-evenly md:w-full">
              <div className="flex flex-col justify-center items-center text-theme-white text-[40px] font-bold">
                <div className="flex">
                  {counterOn && (
                    <CountUp start={0} end={225} duration={8} delay={0} />
                  )}
                  +
                </div>

                <span className="text-theme-white text-xs">New Clients</span>
              </div>
              <div className="flex flex-col justify-center items-center text-theme-white text-[40px] font-bold">
                <div className="flex">
                  {counterOn && (
                    <CountUp start={0} end={740} duration={8} delay={0} />
                  )}
                  +
                </div>
                <span className="text-theme-white text-xs">
                  Appointment Booked
                </span>
              </div>
              <div className="flex flex-col justify-center items-center text-theme-white text-[40px] font-bold">
                <div className="flex">
                  {counterOn && (
                    <CountUp start={0} end={999} duration={5} delay={0} />
                  )}
                  +
                </div>
                <span className="text-theme-white text-xs">Patients</span>
              </div>
              <div className="flex flex-col justify-center items-center text-theme-white text-[40px] font-bold">
                <div className="flex">
                  {counterOn && (
                    <CountUp start={0} end={95} duration={8} delay={0} />
                  )}
                  %
                </div>
                <span className="text-theme-white text-xs">
                  Satisfied Patients
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollTrigger>
  )
}
