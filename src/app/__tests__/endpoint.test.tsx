import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/constants';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('get weather from API endpoint', () => {
   const urlToSearchFor = `${BASE_URL}/weather?q=Reykjavik&units=metric&appid=${API_KEY}`;

   it('returns data when API call is successful', async () => {
      const mockData = { data: 'test weather data' };
      mockedAxios.get.mockResolvedValue({ data: mockData });

      const result = await axios.get(urlToSearchFor);

      expect(result.data).toEqual(mockData);
   });

   it('throws an error when API call fails', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Not Found'));

      await expect(axios.get(urlToSearchFor)).rejects.toThrow('Not Found');
   });
});
