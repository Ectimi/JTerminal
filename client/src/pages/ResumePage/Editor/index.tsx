import { Fragment } from 'react';
import {
  ActionIcon,
  Button,
  Divider,
  Flex,
  Image,
  SimpleGrid,
  Stack,
  Space,
  Switch,
  Title,
  Text,
  Tooltip,
  Paper,
} from '@mantine/core';
import { ShowNotification } from '@/lib/notification';
import { IconCirclePlus, IconCircleMinus } from '@tabler/icons';
import {
  DragDropContext,
  Draggable,
  DropResult,
  OnDragEndResponder,
} from 'react-beautiful-dnd';
import { StrictModeDroppable } from '@/components/StrictModeDroppable';
import { useSafeState } from 'ahooks';
import { FormRenderer } from '../FormRenderer';
import {
  defaultResumeModule,
  IResumeModule,
  EResumeModuleType,
} from '../resumeModule';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from '../Preview/PDFPreview';
import { Updater } from 'use-immer';
import { saveAs } from 'file-saver';
import { isDate } from '@/lib/utils';
import cloneDeep from 'lodash/cloneDeep';
import clsx from 'clsx';
import dayjs from 'dayjs';
import './index.less';

interface IResumeEditor {
  resumeData: IResumeModule[];
  setResumeData: Updater<IResumeModule[]>;
  togglePriview: (bool: boolean) => void;
  toggleLoading: (bool: boolean) => void;
}

type OnChangeHandle = (params: {
  value: any;
  moduleName: string;
  propName: string;
  listIndex?: number;
}) => void;

const validate = (resumeData: IResumeEditor['resumeData']) => {
  let moduleLable = '';
  for (let i = 0; i < resumeData.length; i++) {
    moduleLable = resumeData[i].moduleLabel;
    const visible = resumeData[i].visible;
    const list = resumeData[i].list;
    if (visible) {
      for (let j = 0; j < list.length; j++) {
        const arr = list[j];
        for (let k = 0; k < arr.length; k++) {
          const item = arr[k];
          if (item.required && !item.value) {
            ShowNotification({
              type: 'warn',
              title: '提示',
              style: {
                width: '400px',
              },
              message: item.label
                ? `${moduleLable}的${item.label}为必填项`
                : `${moduleLable}为必填项`,
            });
            return false;
          }
        }
      }
    }
  }
  return true;
};

export default function ResumeEditor({
  resumeData,
  setResumeData,
  togglePriview,
  toggleLoading,
}: IResumeEditor) {
  const [hoverMoudleName, setHoverMoudleName] = useSafeState('');

  const mouseEnterHandle = (moduleName: string) =>
    setHoverMoudleName(moduleName);

  const mouseLeaveHandle = () => setHoverMoudleName('');

  const onSave = () => {
    console.log('data', resumeData);
  };

  const onReset = () => setResumeData(cloneDeep(defaultResumeModule));

  const onPreview = () => {
    if (validate(resumeData)) {
      toggleLoading(true);
      togglePriview(true);
      let timer = setInterval(() => {
        if (document.querySelector('.pdf-viewer')) {
          toggleLoading(false);
          clearInterval(timer);
        }
      }, 200);
    }
    // toggleLoading(true)
    // togglePriview(true);
    // let timer = setInterval(()=>{
    //   if(document.querySelector('.pdf-viewer')){
    //     toggleLoading(false)
    //     clearInterval(timer)
    //   }
    // },200)
  };

  const onExportPDF = async () => {
    if (validate(resumeData)) {
      const url = await pdf(<PDFDocument resumeData={resumeData} />).toBlob();
      saveAs(URL.createObjectURL(url), 'resume.pdf');
    }
  };

  const onChange: OnChangeHandle = ({
    value,
    moduleName,
    listIndex = null,
    propName,
  }) => {
    if (isDate(value)) {
      value = dayjs(value).format('YYYY-MM-DD');
    }
    setResumeData((draft) => {
      const module = draft.find((module) => module.moduleName === moduleName);
      if (listIndex !== null && propName) {
        const item = module?.list[listIndex].find(
          (listItem) => listItem.propName === propName
        );
        item && (item.value = value);
      } else if (listIndex == null && propName) {
        module && (module.visible = value);
      }
    });
  };

  const addMoudleListItem = (moduleName: string) => {
    const defaultListItem = defaultResumeModule.find(
      (module) => module.moduleName === moduleName
    )?.list[0];
    setResumeData((draft) => {
      const module = draft.find((module) => module.moduleName === moduleName);
      module?.list.push(defaultListItem!);
    });
  };

  const removeModuleListItem = (moduleName: string, listIndex: number) => {
    setResumeData((draft) => {
      const module = draft.find((module) => module.moduleName === moduleName);
      module?.list.splice(listIndex, 1);
    });
  };

  const onDragEnd: OnDragEndResponder = (result: DropResult) => {
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination!.index;
    if (sourceIndex === destinationIndex || destinationIndex === 0) {
      return;
    }
    const rd = cloneDeep(resumeData);
    const [draggedItem] = rd.splice(sourceIndex, 1);
    rd.splice(destinationIndex, 0, draggedItem);
    setResumeData(rd);
  };

  return (
    <div className="ResumeEditor">
      <Paper className="moduleContainer" shadow="xs" p="sm" radius={4}>
        <Stack>
          <Title className="title" order={4}>
            模板管理
          </Title>
          <DragDropContext onDragEnd={onDragEnd}>
            <StrictModeDroppable droppableId="dropList">
              {(provided) => (
                <>
                  <div
                    className="moduleItemList"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {resumeData.map(
                      (
                        { icon, moduleLabel, moduleName, require, visible },
                        index
                      ) => (
                        <Draggable
                          key={moduleName}
                          draggableId={moduleName}
                          index={index}
                          isDragDisabled={
                            moduleName === EResumeModuleType.basic ||
                            moduleName === EResumeModuleType.profile
                          }
                        >
                          {(provided) => (
                            <Flex
                              className={clsx(
                                'moduleItem',
                                moduleName,
                                hoverMoudleName === moduleName ? 'hover' : ''
                              )}
                              align="center"
                              justify="space-between"
                              onMouseEnter={() => mouseEnterHandle(moduleName)}
                              onMouseLeave={() => mouseLeaveHandle()}
                              onDoubleClick={() =>
                                document
                                  .querySelector(`.moduleBox.${moduleName}`)
                                  ?.scrollIntoView()
                              }
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Image
                                src={icon}
                                width={22}
                                height={22}
                                radius={11}
                              />
                              <Text>
                                {moduleLabel === '工作/实习经历'
                                  ? '工作经历'
                                  : moduleLabel}
                              </Text>
                              <Switch
                                sx={{
                                  '.mantine-Switch-track': {
                                    cursor: require ? 'not-allowed' : 'pointer',
                                  },
                                }}
                                checked={visible}
                                onChange={(event) => {
                                  if (require) return;
                                  onChange({
                                    moduleName,
                                    propName: 'visible',
                                    value: event.currentTarget.checked,
                                  });
                                }}
                              />
                            </Flex>
                          )}
                        </Draggable>
                      )
                    )}
                  </div>
                  {provided.placeholder}
                </>
              )}
            </StrictModeDroppable>
          </DragDropContext>
        </Stack>

        <Flex
          className="contorllButton"
          direction="column"
          align="center"
          justify="center"
        >
          <Button className="controlButton reset" color="red" onClick={onReset}>
            重置
          </Button>
          {/* <Button className="controlButton save" onClick={onSave}>
            保存
          </Button> */}
          <Button className="controlButton preview" onClick={onPreview}>
            预览PDF
          </Button>
          <Button className="controlButton export" onClick={onExportPDF}>
            导出PDF
          </Button>
        </Flex>
      </Paper>

      <div className="form">
        <Paper shadow="xs" p={0} radius={4}>
          {resumeData.map(
            ({ moduleLabel, moduleName, multiple, list, visible }, index) =>
              visible && (
                <div
                  key={moduleName}
                  className={clsx(
                    'moduleBox',
                    moduleName,
                    hoverMoudleName === moduleName ? 'hover' : ''
                  )}
                  onMouseEnter={() => mouseEnterHandle(moduleName)}
                  onMouseLeave={() => mouseLeaveHandle()}
                >
                  <div className="moduleBoxItem">
                    {index === 0 && <Space h="sm" />}

                    <Divider
                      my="sm"
                      label={moduleLabel}
                      labelPosition="center"
                      labelProps={{ fz: 'lg', fw: 600 }}
                    />

                    {list.map((arr, listIndex) => (
                      <Fragment key={listIndex}>
                        {multiple && (
                          <Flex
                            sx={{ width: '100%' }}
                            justify="space-between"
                            align="center"
                          >
                            <Divider
                              sx={{ width: '98%' }}
                              label={'条目' + (listIndex + 1)}
                              labelProps={{ fz: 'md', fw: 400, c: '#6e3f3f' }}
                            />
                            {listIndex > 0 && (
                              <Tooltip label="删除条目" position="bottom">
                                <ActionIcon
                                  size="lg"
                                  variant="transparent"
                                  onClick={() =>
                                    removeModuleListItem(moduleName, listIndex)
                                  }
                                >
                                  <IconCircleMinus size={26} />
                                </ActionIcon>
                              </Tooltip>
                            )}
                          </Flex>
                        )}
                        <SimpleGrid cols={2} verticalSpacing="sm">
                          {arr.map(({ type, propName, value, ...rest }) => (
                            <FormRenderer
                              {...rest}
                              key={propName + '_' + listIndex}
                              type={type}
                              value={value}
                              onChange={(value) =>
                                onChange({
                                  moduleName,
                                  listIndex,
                                  propName,
                                  value,
                                })
                              }
                            />
                          ))}
                        </SimpleGrid>
                      </Fragment>
                    ))}
                  </div>

                  {multiple && (
                    <Flex justify="center" sx={{ marginTop: '20px' }}>
                      <Tooltip label="添加新条目" position="bottom">
                        <ActionIcon
                          size="lg"
                          variant="transparent"
                          onClick={() => addMoudleListItem(moduleName)}
                        >
                          <IconCirclePlus size={26} />
                        </ActionIcon>
                      </Tooltip>
                    </Flex>
                  )}
                </div>
              )
          )}
        </Paper>
      </div>
    </div>
  );
}
