import * as Tooltip from '@radix-ui/react-tooltip';
import type { CustomTooltipProps } from './CustomTooltip.types';
import { useApp } from '@/providers/AppProvider/AppProvider';

const CustomTooltip = ({
  children,
  content,
  side,
  maxWidth,
}: CustomTooltipProps) => {
  const { contextState } = useApp();
  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side || 'top'}
            sideOffset={5}
            style={{
              background: contextState.theme === 'dark' ? '#eee' : '#333',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              maxWidth,
              textAlign: 'center',
              marginBottom: '-1px',
              color: contextState.theme === 'dark' ? '#333' : '#eee',
            }}
          >
            {content}
            <Tooltip.Arrow
              style={{
                fill: contextState.theme === 'dark' ? '#eee' : '#333',
              }}
            />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
