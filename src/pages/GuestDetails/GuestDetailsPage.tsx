import { useState } from 'react'
import { Header } from '@/components/organisms/Header'
import type { GuestDetails } from '@/types/guestDetails'

type GuestDetailsErrors = Partial<Record<keyof GuestDetails, string>>

type GuestDetailsFormState = GuestDetails

const initialFormState: GuestDetailsFormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  specialRequests: '',
}

function trimValue(value: string) {
  return value.trim()
}

export function GuestDetailsPage() {
  const [formState, setFormState] = useState<GuestDetailsFormState>(initialFormState)
  const [errors, setErrors] = useState<GuestDetailsErrors>({})
  const [submissionMessage, setSubmissionMessage] = useState('')

  const updateField = (field: keyof GuestDetailsFormState, value: string) => {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }))

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }))
  }

  const validateForm = () => {
    const nextErrors: GuestDetailsErrors = {}

    const firstName = trimValue(formState.firstName)
    if (!firstName) {
      nextErrors.firstName = 'First name is required.'
    }

    const lastName = trimValue(formState.lastName)
    if (!lastName) {
      nextErrors.lastName = 'Last name is required.'
    }

    const email = trimValue(formState.email)
    if (!email) {
      nextErrors.email = 'Email address is required.'
    } else {
      const simpleEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!simpleEmailPattern.test(email)) {
        nextErrors.email = 'Please enter a valid email address.'
      }
    }

    const phone = trimValue(formState.phone)
    if (!phone) {
      nextErrors.phone = 'Phone number is required.'
    }

    const specialRequests = trimValue(formState.specialRequests)
    if (specialRequests.length > 500) {
      nextErrors.specialRequests = 'Special requests must be 500 characters or fewer.'
    }

    return nextErrors
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setSubmissionMessage('')
      return
    }

    const cleanedValues: GuestDetails = {
      firstName: trimValue(formState.firstName),
      lastName: trimValue(formState.lastName),
      email: trimValue(formState.email),
      phone: trimValue(formState.phone),
      specialRequests: trimValue(formState.specialRequests),
    }

    void cleanedValues
    setSubmissionMessage('Guest details are ready to continue.')
  }

  const labelClassName =
    'mb-2 block font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-charcoal/75'
  const inputClassName =
    'w-full rounded-none border border-savoy-warm-grey bg-savoy-ivory px-3 py-3 font-savoy-sans text-sm text-savoy-charcoal transition-colors duration-200 placeholder:text-savoy-charcoal/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne'
  const textareaClassName = `${inputClassName} min-h-[110px] resize-none`

  return (
    <main className="min-h-screen bg-savoy-ivory text-savoy-charcoal">
      <Header />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8 xl:px-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <p className="font-savoy-sans text-[10px] tracking-[0.18em] text-savoy-charcoal/60">
              GUEST DETAILS
            </p>
            <h1 className="mt-3 font-savoy-display text-4xl leading-tight text-savoy-charcoal sm:text-5xl">
              Guest Details
            </h1>
            <p className="mt-4 max-w-xl font-savoy-sans text-sm leading-relaxed text-savoy-charcoal/75">
              Enter the primary guest&apos;s contact details.
            </p>
          </div>

          <form
            className="border border-savoy-warm-grey bg-white p-5 sm:p-7"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="firstName" className={labelClassName}>
                  FIRST NAME
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formState.firstName}
                  onChange={(event) => updateField('firstName', event.target.value)}
                  aria-invalid={Boolean(errors.firstName)}
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  className={inputClassName}
                  autoComplete="given-name"
                />
                {errors.firstName && (
                  <p id="firstName-error" className="mt-2 font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className={labelClassName}>
                  LAST NAME
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formState.lastName}
                  onChange={(event) => updateField('lastName', event.target.value)}
                  aria-invalid={Boolean(errors.lastName)}
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  className={inputClassName}
                  autoComplete="family-name"
                />
                {errors.lastName && (
                  <p id="lastName-error" className="mt-2 font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className={labelClassName}>
                  EMAIL ADDRESS
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={(event) => updateField('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClassName}
                  autoComplete="email"
                />
                {errors.email && (
                  <p id="email-error" className="mt-2 font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className={labelClassName}>
                  PHONE NUMBER
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  className={inputClassName}
                  autoComplete="tel"
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-2 font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="specialRequests" className={labelClassName}>
                SPECIAL REQUESTS
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formState.specialRequests}
                onChange={(event) => updateField('specialRequests', event.target.value)}
                aria-invalid={Boolean(errors.specialRequests)}
                aria-describedby={errors.specialRequests ? 'specialRequests-error' : undefined}
                maxLength={500}
                className={textareaClassName}
                placeholder="Optional"
              />
              <div className="mt-1 flex items-center justify-between gap-4 text-[10px] tracking-[0.08em] text-savoy-charcoal/60">
                <p>Special requests are subject to availability and cannot be guaranteed.</p>
                <span>{formState.specialRequests.length}/500</span>
              </div>
              {errors.specialRequests && (
                <p id="specialRequests-error" className="mt-2 font-savoy-sans text-[10px] tracking-[0.08em] text-red-700">
                  {errors.specialRequests}
                </p>
              )}
            </div>

            {submissionMessage && (
              <p className="mt-4 font-savoy-sans text-[10px] tracking-[0.08em] text-savoy-charcoal/70">
                {submissionMessage}
              </p>
            )}

            <button
              type="submit"
              className="mt-5 w-full border border-savoy-charcoal bg-savoy-charcoal px-4 py-3 font-savoy-sans text-[10px] tracking-[0.16em] text-savoy-ivory transition-colors duration-200 hover:border-savoy-champagne hover:bg-savoy-champagne hover:text-savoy-charcoal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-savoy-champagne"
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
