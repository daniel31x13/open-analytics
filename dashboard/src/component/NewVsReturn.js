import 'chart.js/auto';
import { Line } from "react-chartjs-2";

const NewVsReturn = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "New Users",
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2
      },
      {
        label: "Returning Users",
        data: [33, 25, 35, 51, 54, 76],
        fill: true,
        borderColor: "#742774",
        tension: 0.2
      }
    ]
  };
 
  return ( <div className='NewVsReturn'>
      <Line 
        data={data} 
        options={{ 
          maintainAspectRatio: false, 
          plugins: { title: { display: true, text: 'New versus returning users:' }}
        }}
        />
    </div> );
};

export default NewVsReturn;
