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

const TopPages = ({pages}) => {
  function getTopPagesKeys() {
    const Pages = pages.map((entity) => {return entity.Url});
  
    let stats = Pages.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
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

  function getTopPagesValues() {
    const Pages = pages.map((entity) => {return entity.Url});
  
    let stats = Pages.reduce((a, b) => a.set(b, (a.get(b) || 0) + 1), new Map());
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



  const labels = getTopPagesKeys();

  const data = {
    labels,
    datasets: [
      {
        label: 'Links',
        data: getTopPagesValues(),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      }
    ],
  };

  return ( <div className='TopPages'>
    <h2>Top 5 most visited links:</h2>
    <Bar 
        data={data} 
        options={{ borderRadius: 5
        }}
      />
  </div> );
};

export default TopPages;
