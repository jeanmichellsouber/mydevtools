import { BsCopy } from 'react-icons/bs';
import {
  StyledCopyCommandButton,
  StyledCopyCommandLink,
} from './CopyCommandButton.styles';
import type { CopyCommandButtonProps } from './CopyCommandButton.types';
import { toast } from 'react-toastify/unstyled';
import { copyToClipboard } from '@/utils/utils';
import { GoLinkExternal } from 'react-icons/go';
import { PiLinkSimple } from 'react-icons/pi';
import { IoIosArrowForward } from 'react-icons/io';
import { useApp } from '@/providers/AppProvider/AppProvider';

export const CopyCommandButton = ({
  label,
  type,
  hint,
}: CopyCommandButtonProps) => {
  const { contextState } = useApp();
  return type === 'command' ? (
    <StyledCopyCommandButton
      theme={contextState.theme}
      title={hint || label}
      onClick={() => {
        copyToClipboard(label);
        toast('Copied to clipboard!', { type: 'success' });
      }}
    >
      <div style={{ width: 'calc(100% - 20px)' }}>
        <div className="icon">{<IoIosArrowForward />}</div>
        <span>
          <small className="hint">{hint}</small>
          <span>{label}</span>
        </span>
      </div>
      <div className="secondary-icon">
        <BsCopy size="16" />
      </div>
    </StyledCopyCommandButton>
  ) : (
    <StyledCopyCommandLink
      title={hint || label}
      href={label}
      target="_blank"
      theme={contextState.theme}
    >
      <div style={{ width: 'calc(100% - 20px)' }}>
        <div className="icon">{<PiLinkSimple />}</div>
        <span>
          <small className="hint">{hint}</small>
          <span
            style={{
              borderBottom: `1px dashed ${contextState.theme === 'dark' ? '#aaa' : '#111'}`,
            }}
          >
            {label}
          </span>
        </span>
      </div>
      <div className="secondary-icon">
        <GoLinkExternal size="17" />
      </div>
    </StyledCopyCommandLink>
  );
};
