import axiosInstance from '@/api/axios-instance';

const useReport = () => {
  const getMonthly = async (query) => {
    const { data } = await axiosInstance.get('/reports/monthly', {
      params: query,
    });
    return data;
  };

  const getYearly = async (query) => {
    const { data } = await axiosInstance.get('/reports/yearly', {
      params: query,
    });
    return data;
  };

  const downloadReportMonnthly = async (query) => {
    return await axiosInstance.get('/reports/download/monthly', { params: query,responseType: 'blob' });
  };

  return {
    getMonthly,
    getYearly,
    downloadReportMonnthly
  };
};

export default useReport;
