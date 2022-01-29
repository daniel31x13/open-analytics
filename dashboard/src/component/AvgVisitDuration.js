const AvgVisitDuration = ({ time }) => {
  function getAvg() {
    let Times = time.map((entity) => {return parseInt(entity.ActiveTimeInSecond)});
    Times = Times.filter((entity) => {return !Number.isNaN(entity)});
  
    const average = Times.reduce((a, b) => a + b, 0) / Times.length

    return (Math.round(average * 100) / 100).toString();
  }

  return <div className='AvgVisitDuration'>Average time on each page: <h1>{getAvg()}</h1> Seconds</div>;
};

export default AvgVisitDuration;
