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

const HoursOfActivityPerDay = ({ activity }) => {
  let rawData = activity.map((entity) => { // Parse the information so that only the Date (as the key) and the time (as the value) is extracted
    const date = new Date(entity.Date).toISOString().substring(0, 10)
    const num = parseInt(entity.ActiveTimeInSecond);
    const obj = { [date]: num }
    return obj;
  });

  let Data = {};

  for(let i = 0; i < rawData.length; ++i){ // If the keys were the same then add the values together
    for(let obj in rawData[i]){
      Data[obj] = Data[obj] ? Data[obj] + rawData[i][obj] : rawData[i][obj];
     }
  }

  const date = Object.keys(Data);
  const Sec = Object.values(Data).map((entity) => {
    return (Math.round(entity / 60 * 100) / 100) 
  });

  const labels = date;

  const data = {
    labels,
    datasets: [
      {
        label: 'Minutes',
        data: Sec,
        backgroundColor: 'rgba(0, 116, 204, 0.2)',
        borderColor: 'rgba(0, 116, 204, 1)',
        borderWidth: 2,
        maxBarThickness: 50
      }
    ],
  };

  return ( <div className='HoursOfActivityPerDay'>
    <Bar 
        data={data} 
        options={{ borderRadius: 5, maintainAspectRatio: false, plugins: { title: { display: true, text: 'Activity per day:' }}
        }}
      />
  </div> );
};

export default HoursOfActivityPerDay;
