import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import Icon from '@synerise/ds-icon';

export const DragHandler = styled(Icon)`
  position: absolute;
  top: 16px;
  left: 0;
  opacity: 0;
`;

export const ItemPart = styled.div<{ align: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props): string => (props.align === 'left' ? 'flex-start' : 'flex-end')};
  flex: ${(props): string => (props.align === 'left' ? '1' : 'auto')};
  max-width: ${(props): string => (props.align === 'left' ? 'calc(100% - 80px)' : '68px')};

  .switch-texts {
    margin: 0;
  }

  .ds-switch {
    margin-left: 8px;
  }
`;

export const ColumnManagerItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 56px;
  justify-content: space-between;
  width: 100%;
  padding: 13px 24px;
  position: relative;
  border-bottom: 1px solid ${(props): string => props.theme.palette['grey-200']};

  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};
    ${DragHandler} {
      opacity: 1;
    }
    .ds-column-manager-item-non-fixed {
      display: flex;
      opacity: 1;
    }
  }

  .ds-column-manager-item-non-fixed {
    display: none;
    opacity: 0;
    transition: all 0.3s ease;
  }
`;

export const ColumnManagerItemName = styled.span`
  font-size: 13px;
  line-height: 1.38;
  color: ${(props): string => props.theme.palette['grey-600']};
  margin-left: 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;

  .search-highlight {
    font-weight: 500;
    color: ${(props): string => props.theme.palette['grey-800']};
  }
`;

export const FixedMenuItemIcon = styled(Icon)`
  svg {
    color: ${(props): string => props.theme.palette['grey-600']};'
    fill: ${(props): string => props.theme.palette['grey-600']};'
  }
`;

export const FixedMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 8px;
  background-color: ${(props): string => props.theme.palette.white};
`;

export const FixedMenuItem = styled.div<{ delete: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 4px 0 4px 8px;
  border-radius: 3px;
  color: ${(props): string => props.theme.palette['grey-700']};
  width: 164px;
  position: relative;
  cursor: pointer;
  
  &:hover {
    background-color: ${(props): string => props.theme.palette['grey-050']};
    color: ${(props): string => props.theme.palette['blue-600']};
    ${FixedMenuItemIcon}{
      svg {
        color: ${(props): string => props.theme.palette['blue-600']}
        fill: ${(props): string => props.theme.palette['blue-600']}
      }
    }
  }
  ${(props): FlattenSimpleInterpolation | false =>
    props.delete &&
    css`
      color: ${props.theme.palette['red-600']};
      svg {
        color: ${props.theme.palette['red-600']};
        fill: ${props.theme.palette['red-600']};
      }
      &:hover {
        background-color: ${props.theme.palette['red-050']};
        color: ${props.theme.palette['red-600']};
      }
    `}
`;

export const FixedMenuItemCheckIcon = styled(Icon)`
  position: absolute;
  top: 4px;
  right: 8px;
`;

export const FixedMenuItemLabel = styled.span`
  margin-left: 12px;
  color: inherit;
  font-size: 13px;
  line-height: 1.38;
  font-weight: 500;
`;
