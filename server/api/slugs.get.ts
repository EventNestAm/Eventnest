// server/api/events/slugs.get.ts
import { eventSlugs } from "~/data/event-slugs";

export default defineEventHandler(() => {
  return eventSlugs;
});