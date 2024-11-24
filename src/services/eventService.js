import { events } from '../../db/models'; // adjust path to your models

export async function getEvents() {
  try {
    const allEvents = await events.findAll();
    return allEvents;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
