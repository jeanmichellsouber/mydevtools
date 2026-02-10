import { BiError } from 'react-icons/bi';
import { BlankWrapper } from '../../components/BlankWrapper';

const NotFound = () => {
  return (
    <>
      <BlankWrapper>
        <>
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <BiError size={50} color="#da3f3f" />
            <h3 className="gradientFont1">Oops! This page doesn’t exist.</h3>
            <p>
              <small>
                Please, use the menu in the left to navigate through the views
                of this app.
              </small>
            </p>
          </div>
        </>
      </BlankWrapper>
    </>
  );
};

export default NotFound;
