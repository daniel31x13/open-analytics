import { useEffect, useState } from 'react';
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

let response;
let devices = [];

let devicesKeys = [];
let devicesValues = [];

function App() {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('http://192.168.1.4:8080/api');
      const data = await res.json();
      await setStats(data);
    }
    fetchStats();
  }, []);
  
  return (
    <div className='container'>
      <About />
      <ActiveVisitors />
      <AvgVisitDuration />
      <Devices devices={stats} />
      <VisitsByCountry location={stats} />
      <TopPages />
      <Referrer links={stats} />
      <HoursOfActivityPerDay />
      <NewVsReturn />
    </div>
  );
}

export default App;
