import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const HoursOfActivityPerDay = () => {
  const labels = ['Jan', 'Feb', 'May', 'Jun', 'Jul'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Day',
        data: [4,3,2,5,1],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ],
  };

  return ( <div className='HoursOfActivityPerDay'>
    <Bar 
        data={data} 
        options={{ 
          maintainAspectRatio: false, 
          plugins: { title: { display: true, text: 'Hours of activity per day:' }}
        }}
      />
  </div> );
};

export default HoursOfActivityPerDay;
