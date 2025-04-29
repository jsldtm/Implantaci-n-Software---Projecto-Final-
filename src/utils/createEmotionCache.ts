// filepath: c:\Users\jsald\my-movies-app\src\utils\createEmotionCache.ts
import createCache from '@emotion/cache';

const createEmotionCache = () => {
  return createCache({ key: 'css', prepend: true });
};

export default createEmotionCache;