import {
  Card,
  Divider,
  Tabs,
  Title,
  Image,
  Text,
  Flex,
  Space,
} from "@mantine/core";
import { useRecoilValue } from "recoil";
import { bookmarksState, IBookmarkItem } from "@/store";
import { useSafeState } from "ahooks";
import { Fragment, useEffect } from "react";
import "./index.less";

export default function BookmarkBox() {
  const { bookmarks, labels } = useRecoilValue(bookmarksState);
  const [activeTab, setActiveTab] = useSafeState(labels[0].label);
  const [showBookmarks, setShowBookmarks] = useSafeState<IBookmarkItem[]>([]);

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
                        width={35}
                        height={35}
                        src={bookmark.icon}
                        withPlaceholder
                        fit="cover"
                      />
                      <Text className="name">{bookmark.name}</Text>
                    </div>
                    <Text className="desc">
                      {bookmark.description || "暂无简介"}
                    </Text>
                  </Card>
                  <Space w="xl" />
                </Fragment>
              ))}
            </Flex>
          </Tabs.Panel>
        ))}
      </Tabs>
    </Card>
  );
}
