import { MainHeader } from './components/MainHeader';
import { NavLink, Route, Routes } from 'react-router-dom';
import CopyCommands from './views/CopyCommands/CopyCommands';
import Flexplanation from './views/Flexplanation/Flexplanation';
import NotFound from './views/NotFound/NotFound';
import SlugGenerator from './views/SlugGenerator/SlugGenerator';
import CustomTooltip from './components/CustomTooltip/CustomTooltip';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify/unstyled';
import { Slide } from 'react-toastify';
import { GoSmiley } from 'react-icons/go';
import { Main } from './components/Main';
import { useApp } from './providers/AppProvider/AppProvider';

const App = () => {
  const { contextState } = useApp();
  return (
    <div
      className={contextState.theme === 'dark' ? 'dark-theme' : 'light-theme'}
    >
      <MainHeader />
      <Main>
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
          <div>
            <p>
              By{' '}
              <a
                className="colorGreen1"
                href="mailto:jeanmichellsouber@gmail.com"
                target="_blank"
              >
                Jean Michell{' '}
                <CustomTooltip content="Say Hi to me, or report a bug!">
                  <GoSmiley />
                </CustomTooltip>
              </a>
              .
            </p>
            <p>
              <small>
                If this app helps you, consider helping me keeping it on air, by{' '}
                <a
                  className="colorGreen1"
                  href="https://www.paypal.com/donate/?hosted_button_id=MMWB2XULZH7LE"
                >
                  making a donation using PayPal
                </a>
                .
              </small>
            </p>
          </div>
        </aside>
        <div className="mainContent">
          <div className="contentWrapper">
            <Routes>
              <Route path="/" element={<CopyCommands />} />
              <Route path="/slug-generator" element={<SlugGenerator />} />
              <Route path="/flexplanation" element={<Flexplanation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Main>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </div>
  );
};

export default App;
