type IconProps = {
  name: 'menu' | 'close' | 'calendar'
}

export function Icon({ name }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className="relative inline-flex h-5 w-5 items-center justify-center"
    >
      {name === 'menu' ? (
        <span className="flex w-[18px] flex-col gap-[5px]">
          <span className="h-px w-full bg-current" />
          <span className="h-px w-2/3 self-end bg-current" />
        </span>
      ) : name === 'close' ? (
        <span className="relative block h-[18px] w-[18px]">
          <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
          <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
        </span>
      ) : (
        <svg
          aria-hidden="true"
          className="h-[18px] w-[18px]"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="17"
            rx="1.5"
            stroke="currentColor"
            strokeWidth="1.5"
            width="18"
            x="3"
            y="4.5"
          />
          <path
            d="M7.5 2.75v3.5M16.5 2.75v3.5M3.5 9h17"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="1.5"
          />
        </svg>
      )}
    </span>
  )
}