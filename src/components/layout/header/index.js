import { useState } from 'react'
import 'react-modern-drawer/dist/index.css'
import HeaderButton from '@/components/button/HeaderButton'
import Drawer from 'react-modern-drawer'
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

const navigation = [
  {
    label: 'Home',
    active: true,
    href: '/home',
  },
  {
    label: 'About Us',
    active: false,
    href: '/aboutus',
  },
  {
    label: 'Service',
    active: false,
    href: '/service',
  },
  {
    label: 'Contact Us',
    active: false,
    href: '/contactus',
  },
  {
    label: 'Book Appointment',
    setActive: true,
    href: '/getintouch',
  },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  return (
    <Disclosure as="nav" className="bg-white shadow relative ">
      {() => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 absolute top-0 z-20  w-full min-w-full py-2  ">
            <div className="flex h-16 justify-between   ">
              <div className="flex justify-between w-full ">
                <div className="flex flex-shrink-0 items-center 2xl:ml-64 lg:ml-1">
                  <img
                    src="/img/logo.png"
                    alt="logo"
                    style={{ height: '200px', marginTop: '5rem' }}
                  />
                </div>
                <div className="hidden 2xl:ml-6 lg:flex 2xl:space-x-8 lg:space-x-2  ">
                  {navigation.map((item, index) => (
                    <HeaderButton key={index} {...item} />
                  ))}
                </div>
              </div>

              <div className="-mr-2 flex items-center lg:hidden ">
                {/* Mobile menu button */}
                <Disclosure.Button className=" inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>

                  <Bars3Icon
                    className="block h-6 w-6 text-theme-white"
                    aria-hidden="true"
                    onClick={toggleDrawer}
                  />
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction="right"
            className="bg-theme-blue  space-y-5 pt-5 pl-2"
            overlayColor={'#2b72ee'}
            overlayOpacity={0.4}
            style={{ backgroundColor: '#2b72ee' }}
            lockBackgroundScroll={true}
          >
            <XMarkIcon
              className="block h-6 w-6 text-theme-white ml-[13rem] cursor-pointer"
              aria-hidden="true"
              onClick={toggleDrawer}
            />

            {navigation.map((item, index) => (
              <HeaderButton key={index} {...item} />
            ))}
            <div className="pt-[21rem]">
              <div className="mt-12 border-t border-gray-200 pt-8 flex flex-row items-center justify-center sm:hidden ">
                <p className="text-base text-theme-white ">
                  {' '}
                  &copy; All Rights Reserved &nbsp;
                  {new Date().getFullYear()}
                </p>
              </div>
            </div>
          </Drawer>
        </>
      )}
    </Disclosure>
  )
}
