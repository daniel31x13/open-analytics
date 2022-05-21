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
import config from "./config.json";

function App() {
  const [stats, setStats] = useState([]);
  const [active, setActive] = useState("0");

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch(config.api.address + ":" + config.api.port + '/api');
      const data = await res.json();
      data.sort((b, a) => new Date(b.Date) - new Date(a.Date)) // Sort by date
      setStats(data);
    }
    fetchStats();
    async function fetchActiveUsers() {
      const res = await fetch(config.api.address + ":" + config.api.port + "/api/active");
      const data = await res.text();
      setActive(parseInt(data));
    }
    fetchActiveUsers();
  }, []);

  return (
    <div className='container'>
      <About />
      <div className='group'>
        <ActiveVisitors active={active} />
        <AvgVisitDuration time={stats} />
      </div>
      <div className='group'>
        <Devices devices={stats} />
        <VisitsByCountry location={stats} />
      </div>
      <TopPages pages={stats} />
      <Referrer links={stats} />
      <HoursOfActivityPerDay activity={stats} />
      <NewVsReturn users={stats} />
    </div>
  );
}

export default App;
