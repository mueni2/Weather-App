import {useContext} from 'react';
import './App.css';
import MyContext from './context/MyContext';
import DropDowns from './components/DropDowns';
import Weather from './components/Weather';

const App = () => {

  const {citySelect} = useContext(MyContext)

  return (
    
    <main>
    
     <DropDowns />
     {citySelect && <Weather />}
   
    </main>
  );
}

export default App;

