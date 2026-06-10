import { HoverCard } from 'radix-ui'

interface Props {
	lane: 'Human-led' | 'Hybrid' | 'AI-led'
	summary: string
}

export function ProvenanceTooltip({ lane, summary }: Props) {
	return (
		<HoverCard.Root openDelay={120} closeDelay={150}>
			<HoverCard.Trigger asChild>
				<button
					type="button"
					aria-label={`DLDS provenance: ${lane} lane. Open for details.`}
					className="inline-flex cursor-help items-center gap-1.5 rounded-sm font-mono text-[12px] font-medium text-body-muted underline decoration-lane-institutional-strong/40 decoration-dotted underline-offset-4 outline-none transition-colors hover:text-body-strong focus-visible:ring-2 focus-visible:ring-accent-prime focus-visible:ring-offset-2 focus-visible:ring-offset-sky-low"
				>
					<span
						className="inline-block size-1.5 rounded-full bg-accent-prime"
						aria-hidden="true"
					/>
					DLDS · {lane} lane
				</button>
			</HoverCard.Trigger>

			<HoverCard.Portal>
				<HoverCard.Content
					side="bottom"
					align="start"
					sideOffset={10}
					collisionPadding={16}
					className="z-50 max-w-[44ch] rounded-md border border-lane-institutional-strong/30 bg-sky-high p-4 font-body text-[13px] leading-relaxed text-body-strong shadow-lg ring-1 ring-lane-institutional-strong/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1"
				>
					<p className="font-nav text-[12px] font-extrabold uppercase tracking-[0.08em] text-accent-prime">
						Dispatch Lane Disclosure System
					</p>
					<p className="mt-1 font-nav text-[12px] font-extrabold uppercase tracking-[0.06em] text-body-strong">
						{lane} lane
					</p>
					<p className="mt-3 text-body-muted">{summary}</p>
					<HoverCard.Arrow className="fill-sky-high" width={12} height={6} />
				</HoverCard.Content>
			</HoverCard.Portal>
		</HoverCard.Root>
	)
}
