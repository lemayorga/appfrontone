 import React from 'react';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.less';
// import { randomFillSync } from 'crypto';
// import { rawListeners } from 'process';
import '../src/styles/global.scss';
//import './App.css';
import Routing from './router/Routing';


 function App(): JSX.Element {
  return (
    <Routing /> 
  );
}

 export default App;


// const App: React.FC = () => (
//   <h1>My React and TypeScript App!{new Date().toLocaleDateString()}</h1>
// );

// export default App;