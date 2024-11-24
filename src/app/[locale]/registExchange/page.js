import RegistExchangeContent from './component/content';
import { getPlatforms } from '@/services/platformService';
export default async function RegistExchange() {
  const platforms = await getPlatforms();
  const plainPlatforms = platforms.map((platform) => platform.toJSON());
  return <RegistExchangeContent platforms={plainPlatforms} />;
}
