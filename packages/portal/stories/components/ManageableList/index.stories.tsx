import * as React from 'react';
import ManageableList from '@synerise/ds-manageable-list';
import FileM from '@synerise/ds-icon/dist/icons/FileM';
import Tag, { TagShape } from '@synerise/ds-tags/dist/Tag/Tag';
import { withState } from '@dump247/storybook-state';
import { action } from '@storybook/addon-actions';
import { ListType } from '@synerise/ds-manageable-list/dist/ManageableList';
import { boolean } from '@storybook/addon-knobs';
import FolderM from '@synerise/ds-icon/dist/icons/FolderM';

const decorator = (storyFn) => (
  <div style={{ width: '200px' }}>
    <div style={{ background: '#fff', width: '300px' }}>
      {storyFn()}
    </div>
  </div>
);

const ITEMS:any = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Default",
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    icon: <FolderM />
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Basic",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "My folder",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    name: "My folder 2",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />
  },
  {
    id: "00000000-0000-0000-0000-000000000004",
    name: "My folder 3",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />
  },
  {
    id: "00000000-0000-0000-0000-000000000005",
    name: "My folder 4",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />
  },
  {
    id: "00000000-0000-0000-0000-000000000006",
    name: "My folder 5",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    icon: <FolderM />
  }
];

const EMPTY_ITEM = {
  id: '',
  name: '',
  canAdd: true,
  canUpdate: true,
  canDelete: true,
  icon: <FolderM />
};

const CONTENT_ITEMS: any = [
  {
    id: "00000000-0000-0000-0000-000000000000",
    name: "Position 0",
    canAdd: true,
    canUpdate: false,
    canDelete: false,
    tag: <Tag name={"A"} shape={TagShape.SINGLE_CHARACTER_ROUND} color={"red"} />,
    content: <div>content</div>,
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    name: "Position 1",
    canAdd: true,
    canUpdate: true,
    canDelete: true,
    tag: <Tag name={"1"} shape={TagShape.SINGLE_CHARACTER_SQUARE} color={"#f3f5f6"} textColor={"#949ea6"} />,
    content: <div>content</div>,
  },
  {
    id: "00000000-0000-0000-0000-000000000001",
    name: "Position 2",
    canAdd: true,
    canUpdate: true,
    canDuplicate: true,
    canDelete: true,
    icon: <FileM />,
  }
];

const stories = {
  default: withState({
    items: ITEMS,
  })(({ store }) => {
    const addItem = ({name}): void => {
      store.set({
        items: [
          ...store.state.items,
          {
            ...EMPTY_ITEM,
            id: Date.now(),
            name,
          }
        ]
      });
    };

    const removeItem = ({id}): void => {
      store.set({
        items: store.state.items.filter(item => item.id !== id),
      });
    };

    const editItem = (props): void => {
      store.set({
        items: store.state.items.map(item => {
          if(item.id === props.id) {
            item.name = props.name;
          }
          return item;
        })
      })
    };

    return (
      <ManageableList
        addItemLabel="Add folder"
        showMoreLabel="show all"
        showLessLabel="show less"
        more="more"
        less="less"
        maxToShowItems={5}
        onItemAdd={addItem}
        onItemRemove={removeItem}
        onItemEdit={editItem}
        onItemSelect={action('onItemSelect')}
        items={store.state.items}
        loading={false}
      />
    )
  }),
  emptyList: {
    addItemLabel: 'Add folder',
    showMoreLabel: 'show all',
    showLessLabel: 'show less',
    more: 'more',
    less: 'less',
    maxToShowItems: 5,
    onItemAdd: action('onItemAdd'),
    onItemRemove: action('onItemRemove'),
    onItemEdit: action('onItemEdit'),
    onItemSelect: action('onItemSelect'),
    items: [],
    loading: false,
  },
  contentList: withState({
    items: CONTENT_ITEMS,
  })(({ store }) => {
    const handleChangeOrder = (newOrder) => {
      store.set({items: newOrder});
    };

    return (
      <ManageableList
        addItemLabel="Add position"
        showMoreLabel="show all"
        showLessLabel="show less"
        more="more"
        less="less"
        maxToShowItems={5}
        onItemAdd={action('onItemAdd')}
        onItemRemove={action('onItemRemove')}
        onItemEdit={action('onItemEdit')}
        onItemSelect={action('onItemSelect')}
        onItemDuplicate={action('onItemDuplicate')}
        onChangeOrder={boolean('Change order available', false) ? handleChangeOrder : null}
        type={ListType.content}
        items={store.state.items}
        loading={false}
        addButtonDisabled={boolean('Disable add item button', false)}
        changeOrderDisabled={boolean('Disable change order', false)}
        greyBackground={boolean('Grey background', false)}
      />
    )
  })
};

export default {
  name: 'Components|Manageable List',
  decorator,
  stories,
  Component: ManageableList,
};