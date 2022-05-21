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

const Referrer = ({ links }) => {
  function getTopLinksKeys() {
    const Links = links.map((entity) => {return entity.Referrer});
  
    let stats = Links.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
    // let topKeys = [...stats.keys()];
    // let topValues = [...stats.values()];
    let topEntries = [...stats.entries()];

    topEntries.sort((function(index){
      return function(a, b){
          return (a[index] === b[index] ? 0 : (b[index] < a[index] ? -1 : 1));
      };
    })(1));

    let sortedTop = topEntries.map((i) => { return i[0] });
    sortedTop = sortedTop.map((i) => { 
      if(i == "") {
        return 'Browser';
    } 
    else {
        return i;
      }
    });
    return sortedTop;
  }

  function getTopLinksValues() {
    const Links = links.map((entity) => {return entity.Referrer});
  
    let stats = Links.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
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

  const labels = getTopLinksKeys().slice(0, 5);

  const data = {
    labels,
    datasets: [
      {
        label: 'Referrer',
        data: getTopLinksValues().slice(0, 5),
        backgroundColor: 'rgba(0, 116, 204, 0.2)',
        borderColor: 'rgba(0, 116, 204, 1)',
        borderWidth: 2,
        maxBarThickness: 50
      }
    ],
  };

  return ( <div className='Referrer'>
    <Bar 
        data={data} 
        options={{maintainAspectRatio: false, indexAxis: 'y', borderRadius: 5, tension: 0.3, plugins: { title: { display: true, text: 'Top 5 referrers:' }}
        }}
      />
  </div> );
};

export default Referrer;
