// This chart is currently in beta, if there's a returning user in one day, there also has to be at least one new user in that day, and vice versa...
import 'chart.js/auto';
import { Line } from "react-chartjs-2";

const NewVsReturn = ({users}) => {
  let rawData = users.map((entity) => { // Parse the information so that only the Date (as the key) and the ip (as the value) is extracted
    const date = new Date(entity.Date).toISOString().substring(0, 10)
    const isNewUser = entity.isNewUser;
    const obj = { date: date, newUser: isNewUser }
    return obj;
  });

  let Dates = rawData.map((entity) => {
    const obj = entity.date;
    return obj;
  }).filter(entity => {return entity});

  let uniqueDates = [...new Set(Dates)];

  function newUsers() {
    let rawUsers = rawData.filter((entity) => {
      return Boolean(entity.newUser)
    });

    let users = rawUsers.map((entity) => {
      let date = entity.date
      return {[date]: 1}
    })

    let Data = {};

    for(let i = 0; i < users.length; ++i){ // If the keys were the same then add the values together
      for(let obj in users[i]){
        Data[obj] = Data[obj] ? Data[obj] + users[i][obj] : users[i][obj];
       }
    }

    return Data
  }

  function returningUsers() {
    let rawUsers = rawData.filter((entity) => {
      return !Boolean(entity.newUser)
    });

    let users = rawUsers.map((entity) => {
      let date = entity.date
      return {[date]: 1}
    })

    let Data = {};

    for(let i = 0; i < users.length; ++i){ // If the keys were the same then add the values together
      for(let obj in users[i]){
        Data[obj] = Data[obj] ? Data[obj] + users[i][obj] : users[i][obj];
       }
    }

    return Data
  }

  // const newUserDates = Object.keys(newUsers());
  const newUserValues = Object.values(newUsers());

  // const returningUserDates = Object.keys(returningUsers());
  const returningUserValues = Object.values(returningUsers());

  const data = {
    labels: uniqueDates,
    datasets: [
      {
        label: "New Users",
        data: newUserValues,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2
      },
      {
        label: "Returning Users",
        data: returningUserValues,
        fill: true,
        borderColor: "#742774",
        tension: 0.2
      }
    ]
  };
 
  return ( <div className='NewVsReturn'>
    <h2>New versus returning users:</h2>
      <Line 
        data={data}
        />
    </div> );
};

export default NewVsReturn;
