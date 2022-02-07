import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

const Devices = ({devices}) => {
  function getDevicesKeys() {
    const Devices = devices.map((entity) => {return entity.IsMobile});
  
    let deviceStats = Devices.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    let devicesKeys = [...deviceStats.keys()];

    return devicesKeys;
  }

  function getDevicesValue() {
    const Devices = devices.map((entity) => {return entity.IsMobile});
  
    let deviceStats = Devices.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    let devicesValues = [...deviceStats.values()];

    return devicesValues;
  }  

  const data = {
    labels: getDevicesKeys(),
    datasets: [
      {
        label: 'Devices',
        data: getDevicesValue(),
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
          plugins: { title: { display: true, text: 'Users were using Mobile/tablet?' }}
        }}
        />
    </div> );
};

export default Devices;
