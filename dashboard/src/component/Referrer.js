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

const Referrer = () => {
  const labels = ['/home', '/samplePage', '/anotherSamplePage', '/alsoAnotheSamplePage', 'lastSamplePage'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Links',
        data: [4,3,2,5,1],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ],
  };

  return ( <div className='Referrer'>
    <Bar 
        data={data} 
        options={{ 
          maintainAspectRatio: false, 
          plugins: { title: { display: true, text: 'Coming from:' }}
        }}
      />
  </div> );
};

export default Referrer;
