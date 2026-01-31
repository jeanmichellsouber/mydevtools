import { StyledMainHeader } from './MainHeader.styles';
import MyDevToolsLogo from '../../assets/images/mydevtools.svg';

export const MainHeader = () => {
  return (
    <StyledMainHeader>
      <div>
        <img src={MyDevToolsLogo} title="MY_DEV Tools" />
      </div>
      <div>Theme switcher</div>
    </StyledMainHeader>
  );
};
