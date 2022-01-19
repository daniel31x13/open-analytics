import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const Devices = () => {
  const data = {
    labels: ['Mobile/Tablet', 'Desktop'],
    datasets: [
      {
        label: 'Devices',
        data: [12, 19],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
        ],
        borderWidth: 1,
        borderRadius: 5
      },
    ],
  };

  return ( <div className='Devices'>
      <Pie 
        data={data} 
        options={{ 
          maintainAspectRatio: false, 
          plugins: { title: { display: true, text: 'Mobile/tablet users against desktop users:' }}
        }}
        />
    </div> );
};

export default Devices;
