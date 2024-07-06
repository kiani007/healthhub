import { IdCard } from '@/svg/IdCard'
import { PagesX } from '@/svg/PagesX'
import { Certificate } from '@/svg/Certificate'

const items = [
  {
    icon: <IdCard />,
    title: 'Expert Practitioners',
    description:
      'Our team of expert practitioners has the knowledge and experience necessary to provide you with top-notch healthcare services.',
    classNames:
      'flex flex-col items-center  py-10 rounded-tr-3xl rounded-bl-3xl lg:px-16 px-10 shadow-lg shadow-black/10 lg:mr-8 mb-5 bg-theme-white bg-theme-blue-hover text-theme-white-hover ',
  },
  {
    icon: <PagesX />,
    title: 'Quality Care',
    description:
      'We maintain the highest quality standards to ensure you receive the best possible healthcare experience.',
    classNames:
      'flex flex-col items-center py-10  rounded-tr-3xl rounded-bl-3xl lg:px-16 px-10 lg:z-50 shadow-lg shadow-black/10 lg:mr-3 mb-5 border-color-white-hover bg-theme-blue bg-theme-white-hover text-theme-white  text-theme-black-hover',
  },
  {
    icon: <Certificate />,
    title: 'Certified Procedures',
    description:
      'Our certified procedures ensure that you can trust our platform for reliable and effective healthcare solutions.',
    classNames:
      'flex flex-col items-center py-10 rounded-tr-3xl rounded-bl-3xl lg:px-16 px-10 lg:z-50 lg:ml-4  shadow-lg shadow-black/10 mb-5 bg-theme-white bg-theme-blue-hover text-theme-white-hover border-color-hover ',
  },
]

export default function Cards() {
  const itemElements = items.map((item) => (
    <div key={item.title} className={item.classNames}>
      <div className="w-[43.75px] h-[40.63px]">{item.icon}</div>
      <h3 className="py-2 text-xl font-sans font-bold text-theme heading-hover">
        {item.title}
      </h3>
      <p className="w-56 text-center text-sm font-normal">{item.description}</p>
    </div>
  ))
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex lg:flex-row flex-col lg:mx-1  lg:mt-[-100px] lg:z-10 my-20  mx-[2rem] ">
        {itemElements}
      </div>
    </div>
  )
}
