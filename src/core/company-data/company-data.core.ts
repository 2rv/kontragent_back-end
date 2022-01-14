import axios from 'axios';
import { KonturConfig } from 'src/config/kontur.config';

export const KonturApi = axios.create({
  baseURL: 'https://focus-api.kontur.ru/api3/',
  params: {
    key: KonturConfig.testApiKey,
  },
});
