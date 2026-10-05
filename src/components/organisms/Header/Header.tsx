import { useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/atoms/Icon'
import { Wordmark } from '@/components/atoms/Wordmark'
import { NavigationItem } from '@/components/molecules/NavigationItem'

const primaryNavigationItems = [
  { href: '#rooms-and-suites', label: 'Rooms & Suites' },
  { href: '#dining', label: 'Dining' },
  { href: '#experiences', label: 'Experiences' },
]

const secondaryNavigationItems = [
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

const mobileNavigationItems = [
  ...primaryNavigationItems,
  ...secondaryNavigationItems,
]

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const menuPanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
        return
      }

      if (event.key !== 'Tab') return

      const focusableElements = menuPanelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusableElements?.length) return

      const firstElement = focusableElements.item(0)
      const lastElement = focusableElements.item(focusableElements.length - 1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMobileMenuOpen])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    menuButtonRef.current?.focus()
  }

  return (
    <header className="relative z-40 w-full bg-savoy-ivory text-savoy-charcoal">
      <div className="hidden border-b border-savoy-warm-grey/70 lg:block">
        <div className="mx-auto flex h-10 max-w-[1440px] items-center justify-between px-8 xl:px-14">
          <p className="font-savoy-sans text-[10px] tracking-[0.22em]">
            SAVOY PREMIUM HOTEL
          </p>
          <nav aria-label="Utility navigation" className="flex items-center gap-7">
            <a
              href="#contact"
              className="font-savoy-sans text-[10px] tracking-[0.13em] transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne"
            >
              Contact
            </a>
            <a
              href="#location"
              className="font-savoy-sans text-[10px] tracking-[0.13em] transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne"
            >
              Location
            </a>
            <span
              aria-label="Language: English"
              className="border-l border-savoy-warm-grey pl-5 font-savoy-sans text-[10px] tracking-[0.13em]"
            >
              EN
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto hidden h-[116px] max-w-[1440px] grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center border-b border-savoy-warm-grey/70 px-8 lg:grid xl:px-14">
        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-6 xl:gap-9">
            {primaryNavigationItems.map((item) => (
              <li key={item.href}>
                <NavigationItem href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <Wordmark size="desktop" />

        <div className="flex items-center justify-end gap-5 xl:gap-8">
          <nav aria-label="Secondary navigation">
            <ul className="flex items-center gap-5 xl:gap-8">
              {secondaryNavigationItems.map((item) => (
                <li key={item.href}>
                  <NavigationItem href={item.href} label={item.label} />
                </li>
              ))}
            </ul>
          </nav>
          <a
            href="#booking"
            className="relative whitespace-nowrap py-2 font-savoy-sans text-[10px] tracking-[0.17em] transition-colors duration-200 after:absolute after:bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-savoy-champagne after:transition-transform after:duration-200 hover:text-savoy-champagne hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne xl:text-[11px]"
          >
            BOOK YOUR STAY
          </a>
        </div>
      </div>

      <div className="mx-auto grid h-[76px] max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center border-b border-savoy-warm-grey/70 px-5 sm:px-8 lg:hidden">
        <button
          ref={menuButtonRef}
          type="button"
          aria-label="Open navigation menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex h-11 w-11 items-center justify-center text-savoy-charcoal transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
        >
          <Icon name="menu" />
        </button>

        <Wordmark size="mobile" />

        <a
          href="#booking"
          className="justify-self-end border-b border-savoy-champagne py-2 font-savoy-sans text-[9px] tracking-[0.15em] transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne"
        >
          BOOK
        </a>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={menuPanelRef}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className="fixed inset-0 z-50 flex min-h-dvh flex-col overflow-y-auto bg-savoy-ivory px-6 pb-8 pt-5 text-savoy-charcoal sm:px-10"
        >
          <div className="flex items-center justify-between border-b border-savoy-warm-grey/70 pb-5">
            <span className="font-savoy-sans text-[9px] tracking-[0.22em]">
              MENU
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              aria-label="Close navigation menu"
              onClick={closeMobileMenu}
              className="flex h-11 w-11 items-center justify-center text-savoy-charcoal transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
            >
              <Icon name="close" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex flex-1 items-center py-8"
          >
            <ul className="w-full">
              {mobileNavigationItems.map((item) => (
                <li key={item.href}>
                  <NavigationItem
                    href={item.href}
                    label={item.label}
                    onClick={closeMobileMenu}
                    size="mobile"
                  />
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="#booking"
            onClick={closeMobileMenu}
            className="border-y border-savoy-champagne py-5 font-savoy-sans text-[10px] tracking-[0.18em] transition-colors duration-200 hover:text-savoy-champagne focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne"
          >
            BOOK YOUR STAY
          </a>
        </div>
      )}
    </header>
  )
}