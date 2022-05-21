import 'chart.js/auto';
import { Line } from "react-chartjs-2";

const NewVsReturn = ({users}) => {
  let rawData = users.map((entity) => { // Parse the information so that only the Date (as the key) and the ip (as the value) is extracted
    const date = new Date(entity.Date).toISOString().substring(0, 10)
    const isNewUser = entity.isNewUser;
    const obj = { x: date, y: +isNewUser }
    return obj;
  });

  let Dates = rawData.map((entity) => {
    const obj = entity.x;
    return obj;
  }).filter(entity => {return entity});

  let uniqueDates = [...new Set(Dates)].sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  function newUsers() {
    let rawUsers = rawData.filter((entity) => {
      return Boolean(entity.y)
    });

    for(const i in rawUsers) {
      let counts = 0;
      rawUsers.forEach((x) => {if (x.x === rawUsers[i].x) counts++});
      rawUsers[i].y = counts;
    }


    return rawUsers.filter((value, index, self) => index === self.findIndex((t) => t.x === value.x));
  }

  function returningUsers() {
    let rawUsers = rawData.filter((entity) => {
      return !Boolean(entity.y)
    }).map((entity) => {
      return { x: entity.x , y: 1 }
    });

    for(const i in rawUsers) {
      let counts = 0;
      rawUsers.forEach((x) => {if (x.x === rawUsers[i].x) counts++});
      rawUsers[i].y = counts;
    }
    
    return rawUsers.filter((value, index, self) => index === self.findIndex((t) => t.x === value.x));
  }

  const data = {
    labels: uniqueDates,
    datasets: [
      {
        label: "New Users",
        data: newUsers(),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
        tension: 0.3
      },
      {
        label: "Returning Users",
        data: returningUsers(),
        fill: true,
        backgroundColor: "rgba(0, 116, 204, 0.2)",
        borderColor: "rgba(0, 116, 204, 1)",
        borderWidth: 2,
        tension: 0.3
      }
    ]
  };
 
  return ( <div className='NewVsReturn'>
      <Line 
        data={data} 
        options={{maintainAspectRatio: false, plugins: { title: { display: true, text: 'New versus returning users:' }}}}
        />
    </div> );
};

export default NewVsReturn;
