/**
 * The brand mark: a dot riding a current. One drawn wave-line with a point
 * cresting above it — water and a plotted data point in the same gesture.
 * Stroke inherits currentColor; the dot takes the accent.
 */
export default function Motif({
	size = 44,
	dot = "var(--lav-ink)",
	className,
	strokeWidth = 2.6,
}: {
	size?: number
	dot?: string
	className?: string
	strokeWidth?: number
}) {
	return (
		<svg
			className={className}
			width={size}
			height={size / 2}
			viewBox="0 0 48 24"
			fill="none"
			aria-hidden="true"
		>
			<path
				className="motif-wave"
				d="M2 16.5 C 9 5.5, 16.5 21.5, 24.5 12.5 S 39 9.5, 46 14"
				stroke="currentColor"
				strokeWidth={strokeWidth}
				strokeLinecap="round"
			/>
			<circle className="motif-dot" cx="25" cy="4.5" r="3.2" fill={dot} />
		</svg>
	)
}
