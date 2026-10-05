type NavigationItemProps = {
  href: string
  label: string
  onClick?: () => void
  size?: 'desktop' | 'mobile'
}

export function NavigationItem({
  href,
  label,
  onClick,
  size = 'desktop',
}: NavigationItemProps) {
  const sizeClasses =
    size === 'mobile'
      ? 'w-full border-b border-savoy-warm-grey/70 py-4 font-savoy-display text-[25px] tracking-[0.01em]'
      : 'whitespace-nowrap py-2 font-savoy-sans text-[11px] tracking-[0.13em]'

  return (
    <a
      href={href}
      onClick={onClick}
      className={`group relative inline-flex items-center text-savoy-charcoal transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne ${sizeClasses}`}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="absolute bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-savoy-champagne transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
      />
    </a>
  )
}