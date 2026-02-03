import { BsCopy } from 'react-icons/bs';
import {
  StyledCopyCommandButton,
  StyledCopyCommandLink,
} from './CopyCommandButton.styles';
import type { CopyCommandButtonProps } from './CopyCommandButton.types';
import { IoLinkOutline } from 'react-icons/io5';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';

export const CopyCommandButton = ({
  label,
  type,
  ...rest
}: CopyCommandButtonProps) => {
  return type === 'command' ? (
    <StyledCopyCommandButton {...rest}>
      <div>
        <div className="icon">{<MdOutlineKeyboardArrowRight size="23" />}</div>
        <span>{label}</span>
      </div>
      <div>
        <BsCopy size="15" />
      </div>
    </StyledCopyCommandButton>
  ) : (
    <StyledCopyCommandLink {...rest} href={label}>
      <div>
        <div className="icon">{<IoLinkOutline size="20" />}</div>
        <span>{label}</span>
      </div>
      <div>
        <BsCopy size="15" />
      </div>
    </StyledCopyCommandLink>
  );
};
