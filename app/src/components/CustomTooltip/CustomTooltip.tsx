import * as Tooltip from '@radix-ui/react-tooltip';
import type { CustomTooltipProps } from './CustomTooltip.types';

const CustomTooltip = ({
  children,
  content,
  side,
  maxWidth,
}: CustomTooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side={side || 'top'}
            sideOffset={5}
            style={{
              background: 'linear-gradient(to right, #2d323a, #003e59)',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              maxWidth,
              textAlign: 'center',
            }}
          >
            {content}
            <Tooltip.Arrow style={{ fill: '#003e59' }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
