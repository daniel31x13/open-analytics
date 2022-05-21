import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

const VisitsByCountry = ({location}) => {
  function getTopCountriesKeys() {
    const Location = location.map((entity) => {return entity.Location});
  
    let stats = Location.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    // let topKeys = [...stats.keys()];
    // let topValues = [...stats.values()];
    let topEntries = [...stats.entries()];

    topEntries.sort((function(index){
      return function(a, b){
          return (a[index] === b[index] ? 0 : (b[index] < a[index] ? -1 : 1));
      };
    })(1));

    const sortedTop = topEntries.map((i) => { return i[0] });
    
    return sortedTop;
  }

  function getTopCountriesValues() {
    const Location = location.map((entity) => {return entity.Location});
  
    let stats = Location.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    // let topKeys = [...stats.keys()];
    // let topValues = [...stats.values()];
    let topEntries = [...stats.entries()];

    topEntries.sort((function(index){
      return function(a, b){
          return (a[index] === b[index] ? 0 : (b[index] < a[index] ? -1 : 1));
      };
    })(1));

    const sortedTop = topEntries.map((i) => { return i[1] });

    return sortedTop;
  }

  const data = {
    labels: getTopCountriesKeys().slice(0, 5),
    datasets: [
      {
        label: 'Visits by country',
        data: getTopCountriesValues().slice(0, 5),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderWidth: 2,
        borderColor: 'rgba(100, 0, 100, 1)',
        borderRadius: 5
      },
    ],
  };
  
  return ( <div className='VisitsByCountry'>
    <Doughnut 
        data={data} 
        options={{ 
          maintainAspectRatio: false,
          plugins: { title: { display: true, text: 'Top 5 countries:' }}
        }}
        />
  </div> );
};

export default VisitsByCountry;
