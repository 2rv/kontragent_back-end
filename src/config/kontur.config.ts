import * as config from 'config';

const KONTUR_CONFIG = config.get('KONTUR');

export const KonturConfig = {
  testApiKey: KONTUR_CONFIG.TEST_API_KEY,
  apiKey: process.env.KONTUR_API_KEY || KONTUR_CONFIG.API_KEY,
};
