import styled from 'styled-components';
import { macro } from '@synerise/ds-typography';
import { ItemActionsWrapper } from '../ItemActions/ItemActions.styles';

export const ItemLabel = styled.span`
  ${macro.h300};
  color: ${({ theme }): string => theme.palette['grey-600']};
  height: 24px;
  display: inline-flex;
  align-items: center;
`;

export const ItemLabelWrapper = styled.div`
  flex: 1;
  overflow: hidden;
`;

export const ItemContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
  li {
    width: 100%;
  }

  &:hover {
    ${ItemActionsWrapper} {
      display: flex;
    }
    .ds-manageable-list-item-icon {
      svg {
        color: ${({ theme }): string => theme.palette['blue-600']};
        fill: ${({ theme }): string => theme.palette['blue-600']};
      }
    }
  }
`;