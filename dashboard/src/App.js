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

function App() {
  const [stats, setStats] = useState([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function fetchStats() {
      const res = await fetch('http://192.168.1.4:8080/api');
      const data = await res.json();
      setStats(data);
    }
    fetchStats();
    async function fetchActiveUsers() {
      const res = await fetch('http://192.168.1.4:8080/api/active');
      const data = await res.text();
      setActive(parseInt(data));
    }
    fetchActiveUsers();
  }, []);
  
  return (
    <div className='container'>
      <About />
      <ActiveVisitors active={active} />
      <AvgVisitDuration time={stats} />
      <Devices devices={stats} />
      <VisitsByCountry location={stats} />
      <TopPages pages={stats} />
      <Referrer links={stats} />
      <HoursOfActivityPerDay activity={stats} />
      <NewVsReturn users={stats} />
    </div>
  );
}

export default App;
