import { useApp } from '@/providers/AppProvider/AppProvider';
import { CustomSelectbox } from '../CustomSelectbox';
import { StyledMainHeader } from './MainHeader.styles';
import MyDevToolsLogo from '@/assets/images/mydevtools.svg';

export const MainHeader = () => {
  const { contextState, setContextState } = useApp();
  return (
    <StyledMainHeader theme={contextState.theme}>
      <div>
        <img src={MyDevToolsLogo} title="MY_DEV Tools" />
      </div>
      <div>
        <CustomSelectbox
          options={[
            {
              label: 'Light mode 💡',
              value: 'light',
              selected: contextState.theme === 'light',
            },
            {
              label: 'Dark mode 🌙',
              value: 'dark',
              selected: contextState.theme === 'dark',
            },
          ]}
          onChange={e => {
            setContextState((prev: object) => ({
              ...prev,
              theme: e.target.value,
            }));
          }}
        />
      </div>
    </StyledMainHeader>
  );
};
