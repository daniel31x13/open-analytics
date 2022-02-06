const AvgVisitDuration = ({ time }) => {
  function getAvg() {
    let Times = time.map((entity) => {return parseInt(entity.ActiveTimeInSecond)});
    Times = Times.filter((entity) => {return !Number.isNaN(entity)});
  
    const average = Times.reduce((a, b) => a + b, 0) / Times.length

    if(!isNaN(average)) {
      return (Math.round(average * 100) / 100).toString();
    }

    else {
      return "0";
    }
  }

  return <div className='AvgVisitDuration'>Average time on each page: <h2>{getAvg()}</h2> Seconds</div>;
};

export default AvgVisitDuration;
