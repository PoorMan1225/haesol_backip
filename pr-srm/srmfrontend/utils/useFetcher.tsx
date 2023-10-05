import axios from 'axios';

const useFetcher = () => {
  const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then((res) => res.data.response);
  const fetcherPost = (url: string, data: any) =>
    axios.post(url, data, { withCredentials: true }).then((res) => {
      console.log(res.data);
      res.data.response;
    });

  const fetcherCallback = (url: string, callBack: (data: any) => void) =>
    axios.get(url, { withCredentials: true }).then((res) => {
      const response = res.data.response;
      callBack(response);
      return response;
    });

  return {
    fetcher,
    fetcherPost,
    fetcherCallback,
  };
};

export default useFetcher;
