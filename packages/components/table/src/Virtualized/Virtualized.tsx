import * as React from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import ResizeObserver from 'rc-resize-observer';
import classNames from 'classnames';
import DSTable from '../Table';
import { DSTableProps } from '../Table.types';

interface Props extends DSTableProps<{ key: React.ReactText }> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  columns: any[];
  scroll: {
    x: number;
    y: number;
  };
  cellHeight: number;
}

const VirtualTable: React.FC<Props> = (props: Props) => {
  const { columns, scroll, className, cellHeight = 52 } = props;
  const [tableWidth, setTableWidth] = React.useState(0);

  const widthColumnCount = columns.filter(({ width }) => !width).length;
  const mergedColumns = columns?.map(column => {
    if (column.width) {
      return column;
    }

    return {
      ...column,
      width: Math.floor(tableWidth / widthColumnCount),
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const gridRef = React.useRef<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [connectObject] = React.useState<any>(() => {
    const obj = {};
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft });
        }
      },
    });

    return obj;
  });

  const resetVirtualGrid = (): void => {
    gridRef.current.resetAfterIndices({
      columnIndex: 0,
      shouldForceUpdate: false,
    });
  };

  React.useEffect(() => resetVirtualGrid, []);
  React.useEffect(() => resetVirtualGrid, [tableWidth]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any): React.ReactNode => {
    // eslint-disable-next-line no-param-reassign
    ref.current = connectObject;

    return (
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      <Grid
        ref={gridRef}
        className="virtual-grid"
        columnCount={mergedColumns.length}
        columnWidth={(index): number => {
          const { width } = mergedColumns[index];
          return index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width;
        }}
        height={scroll.y}
        rowCount={rawData.length}
        rowHeight={(): number => cellHeight}
        width={tableWidth}
        onScroll={({ scrollLeft }): void => {
          onScroll({ scrollLeft });
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/explicit-function-return-type */}
        {({ columnIndex, rowIndex, style }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
    );
  };

  return (
    <ResizeObserver
      onResize={({ width }): void => {
        setTableWidth(width);
      }}
    >
      <DSTable
        {...props}
        className={classNames(className, 'virtual-table')}
        columns={mergedColumns}
        pagination={false}
        components={{
          body: renderVirtualList,
        }}
      />
    </ResizeObserver>
  );
};

export default VirtualTable;
