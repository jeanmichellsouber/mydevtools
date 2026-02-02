import { BlankWrapper } from './components/BlankWrapper';
import { MainHeader } from './components/MainHeader';
import { Link, Route, Routes } from 'react-router-dom';
import { currentClass } from './utils/utils';

const App = () => {
  //logic

  return (
    <>
      <MainHeader />
      <main>
        <aside>
          <nav>
            <ul>
              <li>
                <Link
                  to="/copy-commands"
                  className={currentClass('copy-commands')}
                >
                  Copy Commands
                </Link>
              </li>
              <li>
                <Link
                  to="/slug-generator"
                  className={currentClass('slug-generator')}
                >
                  Slug Generator
                </Link>
              </li>
              <li>
                <Link
                  to="/branch-generator"
                  className={currentClass('branch-generator')}
                >
                  Branch Generator
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="mainContent">
          <Routes>
            <Route path="/" element={<p>Home</p>} />
            <Route path="/copy-commands" element={<p>Copy Commands</p>} />
            <Route path="/login" element={<p>Login</p>} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
          <h1>Copy Commands</h1>
          <p>
            Online tool to create and maintain lists of strings. So it's easy to
            copy them by left-clicking.
          </p>
          <p>
            Storing strings in: <strong>Local Storage</strong>.
          </p>
          <BlankWrapper>
            <p>Content goes here...</p>
          </BlankWrapper>
        </div>
      </main>
    </>
  );
};

export default App;
