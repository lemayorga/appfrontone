
import 'antd/dist/antd.css';
// import { randomFillSync } from 'crypto';
// import { rawListeners } from 'process';
import '../src/styles/global.scss';
import './App.css';
import Routing from './router/Routing';


 function App(): JSX.Element {
  return (
    <Routing /> 
  );
}

 export default App;

