import { MainHeader } from './components/MainHeader';
import { NavLink, Route, Routes } from 'react-router-dom';
import CopyCommands from './views/CopyCommands/CopyCommands';
import Flexplanation from './views/Flexplanation/Flexplanation';
import SlugGenerator from './views/SlugGenerator/SlugGenerator';

const App = () => {
  return (
    <>
      <MainHeader />
      <main>
        <aside>
          <nav>
            <ul>
              <li>
                <NavLink to="/">Copy Commands</NavLink>
              </li>
              <li>
                <NavLink to="/slug-generator">Slug Generator</NavLink>
              </li>
              <li>
                <NavLink to="/flexplanation">Flexplanation</NavLink>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<CopyCommands />} />
            <Route path="/slug-generator" element={<SlugGenerator />} />
            <Route path="/flexplanation" element={<Flexplanation />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </div>
      </main>
    </>
  );
};

export default App;
