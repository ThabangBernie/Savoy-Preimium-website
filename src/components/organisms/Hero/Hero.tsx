import heroImage from '@/assets/hero.png'

export function Hero() {
  return (
    <section
      aria-labelledby="home-hero-title"
      className="relative isolate flex h-[calc(100svh-76px)] min-h-[660px] max-h-[850px] items-end overflow-hidden bg-savoy-charcoal md:h-[min(78svh,760px)] md:min-h-[600px] lg:h-[min(72svh,760px)] lg:min-h-[560px] lg:max-h-[760px]"
    >
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-[58%_center] md:object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/18 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-transparent"
      />

      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-12 pt-16 sm:px-8 sm:pb-16 lg:px-8 lg:pb-[clamp(2rem,5vh,4rem)] xl:px-14">
        <div className="max-w-[700px]">
          <p className="mb-5 flex items-center gap-3 font-savoy-sans text-[10px] tracking-[0.24em] text-savoy-ivory sm:mb-6 sm:text-[11px]">
            <span aria-hidden="true" className="h-px w-9 bg-savoy-champagne" />
            SAVOY PREMIUM HOTEL
          </p>

          <h1
            id="home-hero-title"
            className="font-savoy-display text-[clamp(2.25rem,7.7vw,3.25rem)] leading-[1.03] text-savoy-ivory md:text-[clamp(3.25rem,5.1vw,4.5rem)]"
          >
            <span className="block">Where Luxury</span>
            <span className="block">Feels Effortless</span>
          </h1>

          <p className="mt-5 max-w-[470px] font-savoy-sans text-[14px] leading-[1.85] text-savoy-ivory/90 sm:mt-6 sm:text-[16px]">
            An elevated hotel experience shaped by refined comfort, thoughtful
            detail and timeless hospitality.
          </p>

          <div className="mt-7 flex flex-col items-start gap-4 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-7 sm:mt-9">
            <a
              href="#about"
              className="inline-flex min-h-14 items-center justify-center border border-savoy-ivory bg-savoy-ivory px-7 font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal transition-colors duration-300 hover:border-white hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne motion-reduce:transition-none"
            >
              DISCOVER SAVOY
            </a>
            <a
              href="#rooms-and-suites"
              className="group relative inline-flex min-h-12 items-center font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-savoy-champagne"
            >
              EXPLORE ROOMS
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-0 h-px w-full origin-left scale-x-100 bg-savoy-champagne transition-transform duration-300 group-hover:scale-x-0 group-focus-visible:scale-x-0 motion-reduce:transition-none"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-savoy-champagne transition-transform duration-300 group-hover:scale-x-100 group-focus-visible:scale-x-100 motion-reduce:transition-none"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}