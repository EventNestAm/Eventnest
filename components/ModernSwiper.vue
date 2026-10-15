<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const { t } = useI18n();

const BASE = "/images/events";
const EXT = "webp";
const kargin = (n) => `${BASE}/KarginHaxordum/karginHaxordum${n}.${EXT}`;
const fullhouse = (n) => `${BASE}/KarginHaxordum/karginHaxordum${n}.${EXT}`;

const AUTOPLAY_MS = 4000;

const sections = [
	// {
	// 	tag: "QUIZ",
	// 	title: "FULL_HOUSE",
	// 	label: "Full House",
	// 	images: ["", 11, 2, 9, 13, 3, 8, 10, 12].map(fullhouse),
	// },
	{
		tag: "QUIZ",
		title: "KARGIN_SKETCH",
		label: "Kargin Haxordum",
		images: ["", 11, 2, 9, 13, 3, 8, 10, 12].map(kargin),
	},
];

const n = sections.length;
const active = ref(Array(n).fill(0));
const paused = ref(Array(n).fill(false));
const visible = ref(Array(n).fill(false));
const dragging = ref(Array(n).fill(false));
const reduceMotion = ref(false);

const tracks = [];
const carousels = [];
let slideObserver;
let viewObserver;
let drag = null;

const setTrack = (el, i) => {
	if (el) tracks[i] = el;
};
const setCarousel = (el, i) => {
	if (el) carousels[i] = el;
};

const pad = (v) => String(v).padStart(2, "0");

function slideWidth(el) {
	const first = el.firstElementChild;
	if (!first) return 0;
	const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
	return first.getBoundingClientRect().width + gap;
}

function goTo(i, idx) {
	const el = tracks[i];
	if (!el) return;
	const count = sections[i].images.length;
	const target = (idx + count) % count;
	el.scrollTo({
		left: target * slideWidth(el),
		behavior: reduceMotion.value ? "auto" : "smooth",
	});
}

const go = (i, dir) => goTo(i, active.value[i] + dir);

/* ---------- mouse drag (touch uses native scrolling) ---------- */
function onDown(e, i) {
	if (e.pointerType !== "mouse" || e.button !== 0) return;
	const el = tracks[i];
	drag = { i, x: e.clientX, left: el.scrollLeft };
	dragging.value[i] = true;
	el.setPointerCapture(e.pointerId);
}
function onMove(e) {
	if (!drag) return;
	tracks[drag.i].scrollLeft = drag.left - (e.clientX - drag.x);
}
function onUp() {
	if (!drag) return;
	dragging.value[drag.i] = false; // scroll-snap re-engages and settles
	drag = null;
}

function onKey(e, i) {
	if (e.key === "ArrowRight") {
		e.preventDefault();
		go(i, 1);
	} else if (e.key === "ArrowLeft") {
		e.preventDefault();
		go(i, -1);
	}
}

onMounted(() => {
	reduceMotion.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

	// Active slide = the one crossing the horizontal centre line of its track
	sections.forEach((_, i) => {
		const root = tracks[i];
		if (!root) return;
		const io = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (e.isIntersecting) active.value[i] = Number(e.target.dataset.k);
				}
			},
			{ root, rootMargin: "0px -49.5% 0px -49.5%", threshold: 0 },
		);
		root.querySelectorAll(".slide").forEach((s) => io.observe(s));
		(slideObserver ||= []).push(io);
	});

	// Autoplay only while the carousel is on screen
	viewObserver = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				visible.value[carousels.indexOf(e.target)] = e.isIntersecting;
			}
		},
		{ threshold: 0.35 },
	);
	carousels.forEach((c) => viewObserver.observe(c));
});

onBeforeUnmount(() => {
	slideObserver?.forEach((o) => o.disconnect());
	viewObserver?.disconnect();
});
</script>

<template>
	<div class="gallery">
		<section v-for="(section, i) in sections" :key="i" class="block">
			<header class="head">
				<p class="section-label">{{ t(section.tag) }}</p>
				<h2 class="section-title">{{ t(section.title) }}</h2>
			</header>

			<div
				:ref="(el) => setCarousel(el, i)"
				class="carousel"
				@pointerenter="paused[i] = true"
				@pointerleave="paused[i] = false"
				@focusin="paused[i] = true"
				@focusout="paused[i] = false"
				@touchstart.passive="paused[i] = true"
				@touchend.passive="paused[i] = false"
			>
				<ul
					:ref="(el) => setTrack(el, i)"
					class="track"
					:class="{ dragging: dragging[i] }"
					tabindex="0"
					aria-roledescription="carousel"
					:aria-label="section.label"
					@keydown="onKey($event, i)"
					@pointerdown="onDown($event, i)"
					@pointermove="onMove"
					@pointerup="onUp"
					@pointercancel="onUp"
				>
					<li
						v-for="(src, k) in section.images"
						:key="src"
						class="slide"
						:class="{ current: active[i] === k }"
						:data-k="k"
						:aria-label="`${k + 1} / ${section.images.length}`"
					>
						<div class="card">
							<img
								:src="src"
								:alt="section.label"
								:loading="i === 0 && k < 2 ? 'eager' : 'lazy'"
								:fetchpriority="i === 0 && k === 0 ? 'high' : 'auto'"
								decoding="async"
								draggable="false"
							/>
							<div class="shade" />
							<span class="chip">{{ section.label }}</span>
							<span class="num">{{ pad(k + 1) }}</span>
						</div>
					</li>
				</ul>

				<button class="nav prev" aria-label="Previous" @click="go(i, -1)">
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>
				<button class="nav next" aria-label="Next" @click="go(i, 1)">
					<svg
						viewBox="0 0 24 24"
						width="16"
						height="16"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M9 6l6 6-6 6" />
					</svg>
				</button>
			</div>

			<div class="foot">
				<span class="count">
					<b>{{ pad(active[i] + 1) }}</b> / {{ pad(section.images.length) }}
				</span>
				<div class="dots" role="tablist">
					<button
						v-for="(_, k) in section.images"
						:key="k"
						class="dot"
						:class="{ on: active[i] === k }"
						:aria-label="`Slide ${k + 1}`"
						:aria-selected="active[i] === k"
						@click="goTo(i, k)"
					>
						<!-- CSS-driven autoplay: when the fill finishes, go to next slide -->
						<span
							v-if="active[i] === k"
							class="fill"
							:class="{
								halt: paused[i] || !visible[i] || reduceMotion || dragging[i],
							}"
							:style="{ animationDuration: AUTOPLAY_MS + 'ms' }"
							@animationend="go(i, 1)"
						/>
					</button>
				</div>
			</div>
		</section>
	</div>
</template>

<style scoped>
.gallery {
	display: grid;
	grid-template-columns: minmax(0, 1fr);
	gap: clamp(4rem, 9vw, 6.5rem);
	width: 100%;
	max-width: 100%;
	min-width: 0;
}
.block {
	min-width: 0;
	max-width: 100%;
	overflow-x: clip;
}

.head {
	text-align: center;
}
.section-label {
	font-family: "JetBrains Mono", monospace;
	font-size: 11px;
	letter-spacing: 0.35em;
	color: #7c5cfc;
	text-transform: uppercase;
	margin-bottom: 6px;
}
.section-title {
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: clamp(1.4rem, 3.4vw, 2.1rem);
	font-weight: 700;
	color: #1c1530;
	text-transform: uppercase;
	letter-spacing: 0.04em;
}

.carousel {
	--w: min(74vw, 340px);
	position: relative;
	margin-top: 1.75rem;
	min-width: 0;
	max-width: 100%;
}
@media (min-width: 768px) {
	.carousel {
		--w: 360px;
	}
}
@media (min-width: 1280px) {
	.carousel {
		--w: 400px;
	}
}

/* Native scroll-snap. No mask, no perspective, no filters = nothing repaints while scrolling */
.track {
	display: flex;
	gap: 18px;
	width: 100%;
	min-width: 0;
	box-sizing: border-box;
	margin: 0;
	padding: 24px calc(50% - var(--w) / 2) 32px;
	list-style: none;
	overflow-x: auto;
	overscroll-behavior-x: contain;
	scroll-snap-type: x mandatory;
	scrollbar-width: none;
	outline: none;
	cursor: grab;
	-webkit-overflow-scrolling: touch;
}
.track::-webkit-scrollbar {
	display: none;
}
.track.dragging {
	scroll-snap-type: none;
	cursor: grabbing;
	user-select: none;
}
.track:focus-visible {
	box-shadow: inset 0 0 0 2px #7c5cfc55;
	border-radius: 20px;
}

.slide {
	flex: 0 0 var(--w);
	scroll-snap-align: center;
	scroll-snap-stop: always;
}

/* Only transform + opacity are animated (compositor-only). Shadow is static. */
.card {
	position: relative;
	aspect-ratio: 4 / 5;
	border-radius: 22px;
	overflow: hidden;
	background: #f0ecff;
	box-shadow: 0 12px 24px -16px rgba(20, 16, 43, 0.5);
	transform: scale(0.88) translateZ(0);
	opacity: 0.6;
	transition:
		transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1),
		opacity 0.35s ease;
}
.slide.current .card {
	transform: scale(1) translateZ(0);
	opacity: 1;
}

.card img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	display: block;
	user-select: none;
	-webkit-user-drag: none;
	pointer-events: none;
}

.shade {
	position: absolute;
	inset: 0;
	background: linear-gradient(180deg, transparent 58%, rgba(14, 10, 32, 0.65));
	pointer-events: none;
}
.chip {
	position: absolute;
	left: 14px;
	bottom: 14px;
	font-family: "JetBrains Mono", monospace;
	font-size: 10px;
	letter-spacing: 0.14em;
	text-transform: uppercase;
	color: #fff;
	padding: 5px 12px;
	border-radius: 999px;
	background: rgba(20, 16, 43, 0.55);
	border: 0.5px solid rgba(255, 255, 255, 0.3);
}
.num {
	position: absolute;
	top: 12px;
	right: 16px;
	font-family: "Space Grotesk", system-ui, sans-serif;
	font-size: 28px;
	font-weight: 700;
	color: rgba(255, 255, 255, 0.9);
	text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
}

.nav {
	position: absolute;
	top: 50%;
	translate: 0 -50%;
	z-index: 2;
	width: 42px;
	height: 42px;
	display: grid;
	place-items: center;
	border-radius: 50%;
	background: #fff;
	color: #1c1530;
	border: 0.5px solid rgba(20, 16, 43, 0.12);
	box-shadow: 0 6px 14px -8px rgba(20, 16, 43, 0.4);
	cursor: pointer;
	transition:
		background 0.2s ease,
		color 0.2s ease;
}
.nav:hover {
	background: #7c5cfc;
	color: #fff;
}
.nav.prev {
	left: 12px;
}
.nav.next {
	right: 12px;
}
@media (hover: none) {
	.nav {
		display: none;
	}
}

.foot {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 18px;
}
.count {
	font-family: "JetBrains Mono", monospace;
	font-size: 12px;
	letter-spacing: 0.1em;
	color: #8a82a8;
}
.count b {
	color: #1c1530;
	font-weight: 700;
}

.dots {
	display: flex;
	align-items: center;
	gap: 6px;
}
.dot {
	position: relative;
	width: 8px;
	height: 8px;
	padding: 0;
	border: 0;
	border-radius: 999px;
	background: #d5cbfa;
	overflow: hidden;
	cursor: pointer;
	transition: width 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.dot.on {
	width: 30px;
}
.fill {
	position: absolute;
	inset: 0;
	background: #7c5cfc;
	transform-origin: left center;
	transform: scaleX(0);
	animation: progress linear forwards;
}
.fill.halt {
	animation-play-state: paused;
}
@keyframes progress {
	to {
		transform: scaleX(1);
	}
}

@media (prefers-reduced-motion: reduce) {
	.card {
		transition: none;
	}
	.fill {
		animation: none;
		transform: scaleX(1);
	}
}
</style>
