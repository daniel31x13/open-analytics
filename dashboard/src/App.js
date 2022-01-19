import './App.css';
import ActiveVisitors from './component/ActiveVisitors';
import AvgVisitDuration from './component/AvgVisitDuration';
import Devices from './component/Devices';
import NewVsReturn from './component/NewVsReturn';
import TopPages from './component/TopPages';
import VisitsByCountry from './component/VisitsByCountry';
import HoursOfActivityPerDay from './component/HoursOfActivityPerDay';
import Footer from './component/Footer';

function App() {
  return (
    <div className='container'>
      <ActiveVisitors />
      <AvgVisitDuration />
      <Devices />
      <VisitsByCountry />
      <TopPages />
      <HoursOfActivityPerDay />
      <NewVsReturn />
      <Footer />
    </div>
  );
}

export default App;
