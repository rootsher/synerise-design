import * as React from 'react';
import * as S from '../Table.styles';
import FilterTrigger from '../FilterTrigger/FilterTrigger';
import { Filter, RowSelection } from '../Table.types';
import TableSelection from './TableSelection';

interface Props<T extends { key: React.ReactText }> {
  title?: React.ReactNode;
  filters?: Filter[];
  selectedRows?: number;
  itemsMenu: React.ReactNode;
  selection?: RowSelection<T>;
  dataSource: T[];
  searchComponent?: React.ReactNode;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const TableHeader: React.FC<Props> = ({
  title,
  filters,
  searchComponent,
  selectedRows,
  itemsMenu,
  selection,
  dataSource,
}) => {
  const renderLeftSide = React.useMemo(() => {
    return selectedRows && selectedRows > 0 ? (
      <S.Left>
        {selection && <TableSelection dataSource={dataSource} selection={selection} />}
        <S.Title>
          <strong>{selectedRows}</strong> selected
        </S.Title>
        {itemsMenu}
      </S.Left>
    ) : (
      <S.Left>
        {selection && <TableSelection dataSource={dataSource} selection={selection} />}
        {title && <S.Title>{title}</S.Title>}
      </S.Left>
    );
  }, [selectedRows, itemsMenu, title, dataSource, selection]);

  return (
    <S.Header>
      {renderLeftSide}
      <S.Right>
        {filters?.map((filter: Filter) => (
          <FilterTrigger
            key={filter.key}
            name={filter.key}
            iconComponent={filter.icon}
            tooltips={filter.tooltips}
            openedLabel={filter.openedLabel}
            /* eslint-disable-next-line react/jsx-handler-names */
            handleClear={filter.handleClear}
            show={filter.show}
            showList={filter.showList}
            selected={filter.selected}
          />
        ))}
        {searchComponent}
      </S.Right>
    </S.Header>
  );
};

export default TableHeader;