<script setup>
const { t } = useI18n();
const localePath = useLocalePath();
const props = defineProps({
	event: {
		type: Object,
		required: true,
	},
	formatDate: {
		type: Function,
		required: true,
	},
	eventDate: {
		type: Boolean,
		required: true,
	},
});

const ticketCode = computed(() => {
	const base = (props.event?.slug || "EVENT")
		.toUpperCase()
		.replace(/[^A-Z0-9]/g, "")
		.slice(0, 6);
	return `EN-${base.padEnd(6, "X")}`;
});
</script>

<template>
	<div class="event-card" :class="!event.eventDate ? 'event-card--closed' : ''">
		<div class="event-card__main">
			<div class="flex items-center justify-between mb-4">
				<p class="event-card__category">
					{{ Array.isArray(event.category) ? event.category.join(", ") : event.category }}
				</p>
			</div>

			<h3
				class="font-display text-xl font-bold mb-3 leading-snug"
				:class="event.eventDate ? 'text-[#1C1530]' : 'text-[#8B86A0] line-through'"
			>
				{{ event.title }}
			</h3>

			<div class="flex items-center text-[#6B6480] text-sm mb-2 gap-1.5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
				<time :datetime="event.date">{{ formatDate(event.date) }}</time>
				<span>•</span>
				<span>{{ event.time }}</span>
			</div>

			<div class="flex items-center text-[#6B6480] text-sm mb-4 gap-1.5">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 shrink-0"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
					/>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
				<span class="truncate">{{ event.location }}</span>
			</div>

			<p
				class="text-sm mb-5 line-clamp-2"
				:class="event.eventDate ? 'text-[#4A4360]' : 'text-[#8B86A0]'"
			>
				{{ event.description }}
			</p>
		</div>

		<div class="event-card__perforation" aria-hidden="true"></div>

		<div class="event-card__stub">
			<NuxtLink
				:to="event.eventDate ? localePath(`/events/${event.slug}`) : null"
				class="event-card__cta"
				:class="event.eventDate ? 'event-card__cta--active' : 'event-card__cta--closed'"
			>
				<span>{{ event.eventDate ? t("REGISTER") : t("CLOSED") }}</span>
				<span v-if="event.eventDate" class="event-card__arrow">→</span>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
.font-display {
	font-family: "Space Grotesk", system-ui, sans-serif;
}
.font-mono {
	font-family: "JetBrains Mono", monospace;
}

.event-card {
	display: flex;
	flex-direction: column;
	height: 100%;
	background: #fffcf7;
	border-radius: 1.25rem;
	box-shadow: 0 12px 30px -14px rgba(20, 16, 43, 0.25);
	overflow: hidden;
	transition:
		transform 0.25s ease,
		box-shadow 0.25s ease;
}

.event-card:hover {
	transform: translateY(-4px);
	box-shadow: 0 20px 40px -16px rgba(20, 16, 43, 0.35);
}

.event-card--closed {
	opacity: 0.65;
}

.event-card__main {
	padding: 1.5rem 1.5rem 1.25rem;
	flex-grow: 1;
}

.event-card__category {
	display: inline-block;
	padding: 0.3rem 0.75rem;
	border-radius: 999px;
	background: #fff1ec;
	color: #ff6f4d;
	font-size: 0.7rem;
	font-weight: 600;
	letter-spacing: 0.02em;
}

.event-card__perforation {
	position: relative;
	height: 0;
	border-top: 2px dashed #e3ddf0;
	margin: 0 1.5rem;
}

.event-card__perforation::before,
.event-card__perforation::after {
	content: "";
	position: absolute;
	top: -10px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background: #faf8f4;
}
.event-card__perforation::before {
	left: -1.5rem;
}
.event-card__perforation::after {
	right: -1.5rem;
}

.event-card__stub {
	padding: 1.1rem 1.5rem 1.4rem;
}

.event-card__cta {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	width: 100%;
	padding: 0.75rem 1.25rem;
	border-radius: 999px;
	font-weight: 600;
	font-size: 0.9rem;
	transition:
		transform 0.2s ease,
		box-shadow 0.2s ease,
		background 0.2s ease;
}

.event-card__cta--active {
	background: linear-gradient(90deg, #7c5cfc, #6b4ce0);
	color: #fff;
	box-shadow: 0 10px 22px -8px rgba(124, 92, 252, 0.5);
}

.event-card__cta--active:hover {
	transform: translateY(-1px) scale(1.01);
	box-shadow: 0 14px 28px -8px rgba(124, 92, 252, 0.55);
}

.event-card__cta--active:active {
	transform: scale(0.98);
}

.event-card__cta--closed {
	background: #f1eef9;
	color: #b3acc9;
	cursor: not-allowed;
}

.event-card__arrow {
	transition: transform 0.25s ease;
}

.event-card__cta--active:hover .event-card__arrow {
	transform: translateX(3px);
}
</style>
