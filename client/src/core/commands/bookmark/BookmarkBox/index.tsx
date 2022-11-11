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
import { useRecoilValue } from 'recoil';
import { bookmarksState, IBookmarkItem } from '@/store';
import { useSafeState, useToggle } from 'ahooks';
import { Fragment, useEffect } from 'react';
import BookmarkModal from '../BookmarkModal';
import './index.less';

export default function BookmarkBox() {
  const { bookmarks, labels } = useRecoilValue(bookmarksState);
 
  const [activeTab, setActiveTab] = useSafeState(labels[0].label);
  const [showBookmarks, setShowBookmarks] = useSafeState<IBookmarkItem[]>([]);
  const [
    bookmarkModalVisible,
    { setLeft: hideBookmarkModal, setRight: showBookmarkModal },
  ] = useToggle();

  const onTabChange = (value: string) => setActiveTab(value);

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
          <Menu.Item component="div" onClick={showBookmarkModal}>
            添加书签
          </Menu.Item>
          <Menu.Item component="div">添加标签</Menu.Item>
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
                <Fragment key={bookmark.name}>
                  <Card
                    className="bookmark-item"
                    shadow="sm"
                    p="xs"
                    radius="md"
                    withBorder
                    onClick={() => window.open(bookmark.url)}
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
            </Flex>
          </Tabs.Panel>
        ))}
      </Tabs>

      <BookmarkModal
        onClose={hideBookmarkModal}
        visible={bookmarkModalVisible}
      />
    </Card>
  );
}
