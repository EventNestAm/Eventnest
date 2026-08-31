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
		<div class="event-card__image-wrap">
			<img
				v-if="event.image"
				:src="event.image"
				:alt="event.title"
				class="event-card__image"
				loading="lazy"
				:class="!event.eventDate ? 'event-card__image--closed' : ''"
			/>
			<div v-else class="event-card__image event-card__image--placeholder">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-10 w-10"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M14 8h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
					/>
				</svg>
			</div>

			<span v-if="!event.eventDate" class="event-card__closed-badge">{{ t("CLOSED") }}</span>
		</div>

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

.event-card__image-wrap {
	position: relative;
	width: 100%;
	aspect-ratio: 16 / 9;
	overflow: hidden;
	background: #f1eef9;
}

.event-card__image {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	transition:
		transform 0.4s ease,
		filter 0.3s ease;
}

.event-card:hover .event-card__image:not(.event-card__image--placeholder) {
	transform: scale(1.04);
}

.event-card__image--closed {
	filter: grayscale(0.6) brightness(0.85);
}

.event-card__image--placeholder {
	display: flex;
	align-items: center;
	justify-content: center;
	color: #b3acc9;
	background: linear-gradient(135deg, #f1eef9, #e3ddf0);
}

.event-card__closed-badge {
	position: absolute;
	top: 0.75rem;
	right: 0.75rem;
	background: rgba(28, 21, 48, 0.75);
	color: #fff;
	font-size: 0.7rem;
	font-weight: 600;
	padding: 0.3rem 0.7rem;
	border-radius: 999px;
	backdrop-filter: blur(4px);
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