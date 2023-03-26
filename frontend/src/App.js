// App.js
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './app/component/Home';

import 'bootstrap/dist/css/bootstrap.min.css';
import PointerHome from './app/component/pointer/index.jsx_bk';
import PointerVote from "./app/component/pointer/PointerVote.jsx_bk";
import Simple from "./app/component/pointer/Simple.jsx_bk";
import StoryHome from "./app/component/story";
import SessionLogin from "./app/component/story/SessionLogin";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<StoryHome />}></Route>
      <Route path='/session/:sessionId' element={<SessionLogin />}></Route>
      <Route path='*' element={<StoryHome />}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
