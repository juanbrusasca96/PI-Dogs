import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/index/Index'
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './components/home/Home';
import FormCreateBreed from './components/formCreateBreed/FormCreateBreed';
import BreedDetail from './components/breedDetail/BreedDetail';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route index path='/' element={<Index />} />
            <Route path='/breeds' element={<Home />} />
            <Route path='/form' element={<FormCreateBreed />} />
            <Route path='/detail/:id' element={<BreedDetail />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
