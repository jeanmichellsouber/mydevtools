import * as Tooltip from '@radix-ui/react-tooltip';
import type { CustomTooltipProps } from './CustomTooltip.types';
import { useThemeStore } from '@/stores/theme.store';

const CustomTooltip = ({
  children,
  content,
  side,
  maxWidth,
}: CustomTooltipProps) => {
  const theme = useThemeStore(state => state.theme);
  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side || 'top'}
            sideOffset={5}
            style={{
              background: theme === 'dark' ? '#eee' : '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              maxWidth,
              textAlign: 'center',
              marginBottom: '-1px',
              color: theme === 'dark' ? '#333' : '#eee',
            }}
          >
            {content}
            <Tooltip.Arrow
              style={{
                fill: theme === 'dark' ? '#eee' : '#333',
              }}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
