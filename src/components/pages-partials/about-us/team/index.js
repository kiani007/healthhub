import Image from 'next/image'

const employees = [
  {
    name: 'Dr. James Carr',
    title: 'CEO & Founder',
    imgSrc: '/img/james.jpg',
  },
  {
    name: 'Dr. Sarah Jones',
    title: 'Medical Specialist',
    imgSrc: '/img/sarah.png',
  },
  {
    name: 'Dr. Rabecca June',
    title: 'HR Manager',
    imgSrc: '/img/rubacca.png',
  },
  {
    name: 'Dr. Abdu Rehman',
    title: 'Pharmacist',
    imgSrc: '/img/dummy.jpg',
  },
  {
    name: 'Dr. Ayaz Khalid',
    title: 'Physiotherapist',
    imgSrc: '/img/dummy.jpg',
  },
]

const Employee = ({ name, title, imgSrc }) => (
  <div className="flex lg:flex-row flex-col lg:space-x-6 justify-center items-center lg:space-y-0 space-y-3 ho">
    <div className="">
      <Image src={imgSrc} alt="" height={500} width={500} />
      <div
        className="text-center shadow-lg bg-theme-white text-theme-blue border-color-hover bg-theme-blue-hover text-theme-white-hover 
      rounded-bl-[2rem] h-1/5 py-5"
      >
        <p className="text-sm font-bold">{name}</p>
        <p className="text-xs text-theme-black heading-hover">{title}</p>
      </div>
    </div>
  </div>
)

export default function Team() {
  return (
    <div className="bg-theme-gray w-full lg:py-10 py-14 ">
      <div className="max-w-7xl mx-auto   w-full lg:pb-[9rem] ">
        <div className="relative flex lg:flex-row flex-col lg:justify-center lg:h-full lg:mx-0 mx-[2rem]   ">
          <div className="bg-cover lg:block hidden">
            <img src="/svg/globle.svg " alt="" />
          </div>
          <div className="lg:absolute lg:flex-row flex-col   lg:my-8 lg:text-center space-y-8 ">
            <div className="lg:w-5/6 space-y-3 lg:my-4  lg:mx-16">
              <p className="text-theme-blue font-bold lg:text-base text-sm w-full lg:text-center">
                Our Team
              </p>
              <h2 className="lg:text-4xl text-3xl font-bold w-full lg:text-center font-[Georgia]">
                Meet our Professionals
              </h2>
              <p className="text-sm  w-full lg:text-center">
                Empowering your health journey with a team of dedicated
                healthcare professionals.
              </p>
            </div>

            <div className="lg:mt-[4rem] mt-0">
              <div className="flex lg:flex-row flex-col lg:space-x-12 justify-center items-center lg:space-y-0 space-y-8 lg:mt-[4rem] mt-0">
                {employees.map((employee, index) => (
                  <Employee key={index} {...employee} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
