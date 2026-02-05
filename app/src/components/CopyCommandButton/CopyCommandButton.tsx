import { BsCopy } from 'react-icons/bs';
import {
  StyledCopyCommandButton,
  StyledCopyCommandLink,
} from './CopyCommandButton.styles';
import type { CopyCommandButtonProps } from './CopyCommandButton.types';
import { MdOutlineHttp } from 'react-icons/md';
import { toast } from 'react-toastify/unstyled';
import { copyToClipboard } from '../../utils/utils';
import { GoCommandPalette, GoLinkExternal } from 'react-icons/go';

export const CopyCommandButton = ({
  label,
  type,
  hint,
}: CopyCommandButtonProps) => {
  return type === 'command' ? (
    <StyledCopyCommandButton
      title={hint || label}
      onClick={() => {
        copyToClipboard(label);
        toast('Copied to clipboard!', { type: 'success' });
      }}
    >
      <div style={{ width: 'calc(100% - 20px)' }}>
        <div className="icon">{<GoCommandPalette />}</div>
        <span>{label}</span>
      </div>
      <div>
        <BsCopy size="15" />
      </div>
    </StyledCopyCommandButton>
  ) : (
    <StyledCopyCommandLink title={hint || label} href={label} target="_blank">
      <div style={{ width: 'calc(100% - 20px)' }}>
        <div className="icon">{<MdOutlineHttp />}</div>
        <span style={{ textDecoration: 'underline' }}>{label}</span>
      </div>
      <div>
        <GoLinkExternal size="17" />
      </div>
    </StyledCopyCommandLink>
  );
};
