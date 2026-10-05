import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { GuestDetailsPage } from '@/pages/GuestDetails'
import { HomePage } from '@/pages/Home'
import { BookingReviewPage } from '@/pages/BookingReview'
import { BookingConfirmationPage } from '@/pages/BookingConfirmation'
import { PaymentPage } from '@/pages/Payment'
import { RoomDetailsPage } from '@/pages/RoomDetails'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rooms/:slug" element={<RoomDetailsPage />} />
        <Route path="/guest-details" element={<GuestDetailsPage />} />
        <Route path="/booking-review" element={<BookingReviewPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route
          path="*"
          element={
            <main className="flex min-h-screen items-center justify-center bg-savoy-ivory px-6 text-center text-savoy-charcoal">
              <div>
                <h1 className="font-savoy-display text-3xl">Page not found</h1>
                <p className="mt-3 font-savoy-sans text-sm text-savoy-charcoal/70">
                  The requested page does not exist.
                </p>
              </div>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
