import { getEvents } from '@/services/eventService';
import EventsComponents from './components/components';

export default async function EventsPage() {
  const events = await getEvents();
  const plainEvents = events.map((event) => event.toJSON());

  return <EventsComponents events={plainEvents} />;
}
