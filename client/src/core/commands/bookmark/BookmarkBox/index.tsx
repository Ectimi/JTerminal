import React, { Fragment, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  ActionIcon,
  Card,
  Tabs,
  Image,
  Text,
  Flex,
  Space,
  Menu,
} from '@mantine/core';
import { IconSettings } from '@tabler/icons';
import {
  useContextMenu,
  Menu as RightClickMenu,
  Item,
  ItemParams,
} from 'react-contexify';
import { useRecoilValue } from 'recoil';
import { userState, bookmarksState, IBookmarkItem } from '@/store';
import { useSafeState, useToggle } from 'ahooks';
import BookmarkModal, {
  IBookmarkModalFormData,
  TBookmarkModalType,
} from '../BookmarkModal';
import LabelModal from '../LabelModal';

import 'react-contexify/ReactContexify.css';
import './index.less';
import { localforage, LocalForageKeys } from '@/lib/localForage';

interface ItemProps {
  bookmark_id: string | number;
}

type ItemData = any;

const MENU_ID = 'menu_id';

const initialBookmarkModalFormData: IBookmarkModalFormData = {
  name: '',
  url: '',
  label: '',
  icon: '',
  description: '',
};

export default function BookmarkBox() {
  const user = useRecoilValue(userState);
  const { bookmarks, labels } = useRecoilValue(bookmarksState);
  const [activeTab, setActiveTab] = useSafeState(labels[0].label);
  const [showBookmarks, setShowBookmarks] = useSafeState<IBookmarkItem[]>([]);
  const [bookmarkModalFormData, setBookmarkModalFormData] = useSafeState(
    initialBookmarkModalFormData
  );
  const [bookmarkModalType, setBookmarkModalType] =
    useSafeState<TBookmarkModalType>('add');
  const [
    bookmarkModalVisible,
    { setLeft: hideBookmarkModal, setRight: showBookmarkModal },
  ] = useToggle();
  const [
    labelModalVisible,
    { setLeft: hideLabelModal, setRight: showLabelModal },
  ] = useToggle();
  const { show } = useContextMenu({ id: MENU_ID });

  const onTabChange = (value: string) => setActiveTab(value);

  const handleItemClick = async ({
    id,
    props,
  }: ItemParams<ItemProps, ItemData>) => {
    const { bookmark_id } = props!;
    let bookmark: IBookmarkItem;
    if (id === 'edit') {
      if (user) {
        const user_bookmarks = (await localforage.getItem(
          LocalForageKeys.USER_BOOKMARKS
        )) as IBookmarkItem[];

        bookmark = user_bookmarks.filter(
          (bookmark) => bookmark.id === bookmark_id
        )[0];
      } else {
        const default_bookmarks = (await localforage.getItem(
          LocalForageKeys.DEFAULT_BOOKMARKS
        )) as IBookmarkItem[];

        const local_bookmarks = (await localforage.getItem(
          LocalForageKeys.LOCAL_BOOKMARKS
        )) as IBookmarkItem[];

        bookmark = [...default_bookmarks, ...local_bookmarks].filter(
          (bookmark) => bookmark.id === bookmark_id
        )[0];
      }
      setBookmarkModalType('edit');
      setBookmarkModalFormData(bookmark);
      showBookmarkModal();
    } else if (id === 'delete') {
    }
  };

  useEffect(() => {
    const obj: Record<string, IBookmarkItem[]> = {};
    labels.forEach((label) => {
      obj[label.label] = [];
    });
    bookmarks.forEach((bookmark) => {
      obj[bookmark.label].push(bookmark);
    });
    setShowBookmarks(obj[activeTab] || []);
  }, [bookmarks, activeTab, labels]);

  return (
    <Card className="bookmark-box">
      <Menu shadow="sm" position="top" withArrow>
        <Menu.Target>
          <ActionIcon
            variant="transparent"
            color="blue"
            className="action-button"
          >
            <IconSettings size={20} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            component="div"
            onClick={() => {
              showBookmarkModal();
              setBookmarkModalType('add');
            }}
          >
            添加书签
          </Menu.Item>
          <Menu.Item component="div" onClick={showLabelModal}>
            添加标签
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <Tabs
        value={activeTab}
        variant="pills"
        orientation="vertical"
        onTabChange={onTabChange}
      >
        <Tabs.List>
          {labels.map((label) => (
            <Tabs.Tab value={label.label} key={label.label}>
              {label.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        {labels.map((label) => (
          <Tabs.Panel
            value={label.label}
            key={label.label}
            pt="xs"
            className="bookmark-wrapper"
          >
            <Flex
              justify="flex-start"
              align="center"
              direction="row"
              wrap="wrap"
            >
              {showBookmarks.map((bookmark) => (
                <Fragment key={bookmark.id}>
                  <Card
                    className="bookmark-item"
                    shadow="sm"
                    p="xs"
                    radius="md"
                    withBorder
                    onClick={() => window.open(bookmark.url)}
                    onContextMenu={(e: React.MouseEvent) => {
                      show({
                        event: e,
                        props: { bookmark_id: bookmark.id },
                        position: {
                          x: e.screenX,
                          y: e.screenY - 50,
                        },
                      });
                    }}
                  >
                    <div className="top">
                      <Image
                        radius="md"
                        width={55}
                        height={35}
                        src={bookmark.icon}
                        withPlaceholder
                        fit="contain"
                      />
                      <Text className="name">{bookmark.name}</Text>
                    </div>
                    <Text className="desc">
                      {bookmark.description || '暂无简介'}
                    </Text>
                  </Card>
                  <Space w="xl" />
                </Fragment>
              ))}

              {createPortal(
                <RightClickMenu id={MENU_ID} animation="slide">
                  <Item id="edit" onClick={handleItemClick}>
                    编辑
                  </Item>
                  <Item id="delete" onClick={handleItemClick}>
                    删除
                  </Item>
                </RightClickMenu>,
                document.getElementById('app')!
              )}
            </Flex>
          </Tabs.Panel>
        ))}
      </Tabs>

      <BookmarkModal
        type={bookmarkModalType}
        formValue={bookmarkModalFormData}
        onClose={hideBookmarkModal}
        visible={bookmarkModalVisible}
      />

      <LabelModal onClose={hideLabelModal} visible={labelModalVisible} />
    </Card>
  );
}
