// data/new-events.ts
//
// Add an entry here whenever you want EventNest to email your guest list
// about a new event. This file is read by the scheduled job in
// server/api/events/announce.get.ts, so the announcement email goes out
// automatically on a timer - it no longer depends on someone visiting
// the site first.
//
// Once an event has been announced, it's safe to leave it in this list
// forever: the job checks the Google Sheet before sending, so an event
// that's already been announced is simply skipped (no duplicate emails).
// You can also just delete an entry once you've confirmed it went out,
// if you'd rather keep this file short.
//
// Title/date/location here should match what you put in useEvents.ts -
// this list only exists to trigger + word the email (always in Armenian,
// since the announcement email itself is Armenian-only).

export interface NewEventAnnouncement {
  id: string | number
  title: string
  date: string // YYYY-MM-DD
  location: string
  slug: string
}

export const newEvents: NewEventAnnouncement[] = [
  {
    id: 54,
    title: "Կարգին հաղորդման Մրցաշար #4",
    date: "2026-08-29",
    location: "The Kond House - 46 Leo Street",
    slug: "kargin-haxordman-viktorina-19",
  },
  {
    id: 58,
    title: "Կարգին հաղորդման Մրցաշար #8",
    date: "2026-08-29",
    location: "The Kond House - 46 Leo Street",
    slug: "kargin-haxordman-viktorina-20",
  },
]