type PriceDisplayProps = {
  price: number
  currency?: 'ZAR'
  suffix?: string
}

export function PriceDisplay({
  price,
  currency = 'ZAR',
  suffix = '/ night',
}: PriceDisplayProps) {
  const formatter = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })
  const parts = formatter.formatToParts(price)
  const currencySymbol = parts.find((part) => part.type === 'currency')?.value
  const formattedAmount = parts
    .filter((part) =>
      ['minusSign', 'plusSign', 'integer', 'group', 'decimal', 'fraction'].includes(
        part.type,
      ),
    )
    .map((part) =>
      part.type === 'group' ? ',' : part.type === 'decimal' ? '.' : part.value,
    )
    .join('')

  return (
    <p className="flex items-baseline gap-1.5 text-savoy-charcoal">
      <span className="font-savoy-display text-lg tabular-nums">
        {currencySymbol}
        {formattedAmount}
      </span>
      {suffix && (
        <span className="font-savoy-sans text-[11px] text-savoy-charcoal/60">
          {suffix}
        </span>
      )}
    </p>
  )
}