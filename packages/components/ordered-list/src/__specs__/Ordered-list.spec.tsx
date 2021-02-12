import { renderWithProvider } from '@synerise/ds-utils/dist/testing';

import * as React from 'react';
import Icon from '@synerise/ds-icon';
import { Close3S } from '@synerise/ds-icon/dist/icons';
import { RenderResult } from '@testing-library/react';
import { OrderedListItem } from '../Ordered-list.types';
import OrderedList from '../Ordered-list';
import { fireEvent } from '@testing-library/dom';

  describe('Ordered-list with nested items', () => {
    const data = [
      { label: 'Option 1' },
      { label: 'Option 2' },
      { label: 'Option 3', subMenu: [{ label: 'Child 1' }] },
      { label: 'Option 4', subMenu: [{ label: 'Child 1' }] },
    ] ;

    it('should render basic menu list', () => {
      // ARRANGE
      const { getByText } = renderWithProvider(<OrderedList data={data as unknown as OrderedListItem[]}/>);

      // ASSERT
      expect(getByText('Option 1')).toBeTruthy();
      expect(getByText('Option 2')).toBeTruthy();
    });
    it('should render children items after click on parent', () => {
      // ARRANGE
      const { getByText } = renderWithProvider(<OrderedList data={data as unknown as OrderedListItem[]} />);

      // ASSERT
      expect(getByText('Child 1')).toBeTruthy();
    });
  });
describe('Ordered-list indexFormatter', () => {
  const indexFormatter = (index: number) => (`${index}-custom`)
  const data = [
    { text: 'Option 1' },
    { text: 'Option 2' },
  ] ;

  it('should render basic menu list', () => {
    // ARRANGE
    const { getByText } = renderWithProvider(<OrderedList data={data as unknown as OrderedListItem[]}  indexFormatter={indexFormatter}/>);

    // ASSERT
    expect(getByText("1-custom")).toBeTruthy();
  });
});
describe('Ordered-list with prefix and suffix', () => {
    const dataSource = [
      {
        text: 'Option 1',
        suffixel: (
          <div className={'suffix-test-wrapper'}>
            <Icon  component={<Close3S />} />
          </div>
        ),
      },
      {
        text: 'Option 2',
        prefixel: (
          <div className={'prefix-test-wrapper'}>
            <Icon  component={<Close3S />} />
          </div>
        ),
      },
      ]
  let renderedMenu: RenderResult;
  beforeEach(() => {
    renderedMenu = renderWithProvider(<OrderedList data={dataSource as unknown as OrderedListItem[]} />);
  });
  it('should render prefix element', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const suffixWrapper = container.querySelector('.suffix-test-wrapper');
    const suffixElement = container.querySelector('.suffix-test-wrapper > .ds-icon');
    // ASSERT
    expect(suffixWrapper).toBeTruthy();
    expect(suffixElement).toBeTruthy();
  });
  it('should render suffix element', () => {
    // ARRANGE
    const { container } = renderedMenu;
    const prefixWrapper = container.querySelector('.prefix-test-wrapper');
    const prefixElement = container.querySelector('.prefix-test-wrapper > .ds-icon');
    // ASSERT
    expect(prefixWrapper).toBeTruthy();
    expect(prefixElement).toBeTruthy();
  });
  });
