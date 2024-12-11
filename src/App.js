import './App.css';
import Navbar from './components/Navbar';
import { NavLink, Route, Routes } from 'react-router-dom';
import NewNote from './pages/NewNote';
import Notes from './pages/Notes';
import logo from './image/logo.png'

function App() {
  return (
    <div className="bg-[url('./image/notepad-3297994_1280.jpg')] bg-cover bg-no-repeat w-screen h-screen App flex justify-center flex-col items-center gap-4">
      <NavLink to='/'><img className='w-[140px]' src={logo}/></NavLink>
      <div className='p-4 rounded-lg bg-slate-400/[.6] w-[450px]'>
        <Navbar/>
        <Routes>
          <Route path="/" element={<NewNote/>}/>
          <Route path="/new-note" element={<NewNote/>}/>
          <Route path="/notes" element={<Notes/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
