import './App.css';
import ActiveVisitors from './component/ActiveVisitors';
import AvgVisitDuration from './component/AvgVisitDuration';
import Devices from './component/Devices';
import NewVsReturn from './component/NewVsReturn';
import TopPages from './component/TopPages';
import VisitsByCountry from './component/VisitsByCountry';
import HoursOfActivityPerDay from './component/HoursOfActivityPerDay';
import About from './component/About';

function App() {
  return (
    <div className='container'>
      <About />
      <ActiveVisitors />
      <AvgVisitDuration />
      <Devices />
      <VisitsByCountry />
      <TopPages />
      <HoursOfActivityPerDay />
      <NewVsReturn />
    </div>
  );
}

export default App;
