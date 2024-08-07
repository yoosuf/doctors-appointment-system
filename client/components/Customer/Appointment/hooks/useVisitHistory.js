import { useState, useEffect } from 'react';
import commonApi from '@/api/common';

const useVisitHistory = (id) => {
  const [loading, setLoading] = useState(false);
  const [visitHistory, setVisitHistory] = useState([]);
  const [patientId, setPatientId] = useState('');

  useEffect(() => {
    if (id) {
      setPatientId(id);
    }
  }, [id]);

  useEffect(() => {
    const fetchAppointmentHistory = async () => {
      if (!patientId) return;
      setLoading(true);
      try {
        const response = await commonApi({
          parameters: [patientId],
          action: 'patientVisithistory',
        });
        const { DATA = [] } = response;
        setVisitHistory(DATA);
      } catch (error) {
        console.error('Error fetching visit history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentHistory();

  }, [patientId]);

  return {
    loading,
    visitHistory,
  };
};

export default useVisitHistory;
