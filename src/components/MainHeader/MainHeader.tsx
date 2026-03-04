import { CustomSelectbox } from '../CustomSelectbox';
import { StyledMainHeader } from './MainHeader.styles';
import MyDevToolsLogo from '@/assets/images/mydevtools.svg';
import { Theme, useThemeStore } from '@/stores/theme.store';

export const MainHeader = () => {
  const setTheme = useThemeStore(state => state.setTheme);
  const theme = useThemeStore(state => state.theme);
  return (
    <StyledMainHeader theme={theme}>
      <div>
        <img src={MyDevToolsLogo} title="MY_DEV Tools" />
      </div>
      <div>
        <CustomSelectbox
          options={[
            {
              label: 'Light mode 💡',
              value: 'light',
              selected: theme === 'light',
            },
            {
              label: 'Dark mode 🌙',
              value: 'dark',
              selected: theme === 'dark',
            },
          ]}
          onChange={e => {
            setTheme(e.target.value as Theme);
          }}
        />
      </div>
    </StyledMainHeader>
  );
};
