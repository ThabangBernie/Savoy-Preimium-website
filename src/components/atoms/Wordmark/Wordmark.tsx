type WordmarkProps = {
  size: 'desktop' | 'mobile'
}

export function Wordmark({ size }: WordmarkProps) {
  const sizeClasses =
    size === 'desktop'
      ? 'text-[39px] leading-none tracking-[0.14em]'
      : 'text-[25px] leading-none tracking-[0.1em]'

  return (
    <a
      href="/"
      aria-label="Savoy Premium Hotel home"
      className="flex flex-col items-center text-savoy-charcoal transition-opacity duration-200 hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne"
    >
      <span className={`font-savoy-display ${sizeClasses}`}>SAVOY</span>
      <span className="mt-[5px] font-savoy-sans text-[9px] leading-none tracking-[0.3em]">
        PREMIUM HOTEL
      </span>
    </a>
  )
}