import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, NavLink} from 'react-router-dom';
import barcodeGen from './barcodeGen';

function App() {
  return (
    <BrowserRouter>
    <div>
        <Switch>
         <Route path="/" component={barcodeGen} exact/>
         {/* <Route path="/about" component={About}/> */}
         {/* <Route path="/contact" component={Contact}/> */}
        <Route component={Error}/>
       </Switch>
    </div> 
  </BrowserRouter>
  );
}

export default App;
