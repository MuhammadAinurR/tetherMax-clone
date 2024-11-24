import { platforms } from '../../db/models';

export async function getPlatforms() {
  try {
    const allPlatforms = await platforms.findAll();
    return allPlatforms;
  } catch (error) {
    console.error('Error fetching platforms:', error);
    throw error;
  }
}
