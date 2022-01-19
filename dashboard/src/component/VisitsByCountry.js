import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const VisitsByCountry = () => {
  const data = {
    labels: ['CA', 'CN', 'IN', 'RO', 'FR'],
    datasets: [
      {
        label: 'Visits by country',
        data: [27, 19, 3, 5, 2],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 0.8)'
        ],
        borderWidth: 2,
        borderRadius: 5
      },
    ],
  };
  
  return ( <div className='VisitsByCountry'>
    <Doughnut 
        data={data} 
        options={{ 
          maintainAspectRatio: false, 
          plugins: { title: { display: true, text: 'Top 5 most visited countries:' }}
        }}
        />
  </div> );
};

export default VisitsByCountry;
