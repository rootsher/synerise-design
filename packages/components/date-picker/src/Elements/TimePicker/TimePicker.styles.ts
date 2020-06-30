import styled from 'styled-components';
import { borderStyle } from '../../DatePicker.styles';


// eslint-disable-next-line import/prefer-default-export
export const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr;

  > * {
    grid-row: 1;

    &:not(:last-child) {
      border-right: ${borderStyle};
    }
  }
`;