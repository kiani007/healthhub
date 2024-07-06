import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function HeaderButton({
  active,
  label,
  setActive,
  href,
  ...rest
}) {
  const Router = useRouter()
  return (
    <Link href={href}>
      <div
        className={`flex items-center space-x-2  px-6 py-2 lg:h-[6vh] cursor-pointer lg:mt-1 ${
          href === Router.pathname
            ? ` ${href === '/getintouch' ? '' : 'border-b-2'}   `
            : `${href === '/getintouch' ? '' : 'hover:border-b-2'}  `
        }
      `}
        {...rest}
      >
        <span
          className={`text-sm font-bold  whitespace-nowrap   ${
            setActive
              ? `p-3  bg-theme-white text-theme-blue text-theme-white-hover bg-theme-blue-hover rounded-tl-lg rounded-br-lg`
              : 'text-theme-white '
          }`}
        >
          {label}
        </span>
      </div>
    </Link>
  )
}
