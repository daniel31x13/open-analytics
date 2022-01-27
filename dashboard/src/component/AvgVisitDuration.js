import {useState, useEffect } from 'react';

const AvgVisitDuration = ({ time }) => {
  const [avg, setAvg] = useState(0);
  function getAvg() {
    let Times = time.map((entity) => {return parseInt(entity.ActiveTimeInSecond)});
    Times = Times.filter((entity) => {return !Number.isNaN(entity)});
  
    const average = Times.reduce((a, b) => a + b, 0) / Times.length

    return (Math.round(average * 100) / 100).toString();
  }

  return <div className='AvgVisitDuration'>Average time on website: <h1>{getAvg()}</h1> Seconds</div>;
};

export default AvgVisitDuration;
