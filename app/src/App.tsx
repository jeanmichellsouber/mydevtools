import { Tooltip } from '@radix-ui/themes/dist/cjs/components/index.js';
import { BlankWrapper } from './components/BlankWrapper';
import { MainHeader } from './components/MainHeader';

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
                <a href="#">Copy Commands</a>
              </li>
              <li>
                <a href="#">Slug Generator</a>
              </li>
              <li>
                <Tooltip content="Add to library">
                  <a href="#">Branch Name gen.</a>
                </Tooltip>
              </li>
            </ul>
          </nav>
        </aside>
        <div className="mainContent">
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
