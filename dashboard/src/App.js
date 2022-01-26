import './App.css';
import ActiveVisitors from './component/ActiveVisitors';
import AvgVisitDuration from './component/AvgVisitDuration';
import Devices from './component/Devices';
import NewVsReturn from './component/NewVsReturn';
import TopPages from './component/TopPages';
import VisitsByCountry from './component/VisitsByCountry';
import HoursOfActivityPerDay from './component/HoursOfActivityPerDay';
import About from './component/About';
import Referrer from './component/Referrer';

let stats;
let devices = [];

async function getStats() {
  const response = await fetch('http://192.168.1.4:8080/api');
  const data = await response.json();
  stats = data;
  getDevices();
}

function getDevices() {
  stats.forEach(entity => {
    devices.push(entity.IsMobile);
  });
}

function App() {
  getStats();
  return (
    <div className='container'>
      <About />
      <ActiveVisitors />
      <AvgVisitDuration />
      <Devices data={devices} />
      <VisitsByCountry />
      <TopPages />
      <Referrer />
      <HoursOfActivityPerDay />
      <NewVsReturn />
    </div>
  );
}

export default App;
