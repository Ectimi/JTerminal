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
import { useForm } from '@mantine/form';
import { IconCirclePlus, IconCircleMinus } from '@tabler/icons';
import { useSafeState, useSetState, useUpdateEffect } from 'ahooks';
import { FormType, FormRenderer } from '../FormRenderer';
import { defaultResumeModule } from '../resumeModule';
import clsx from 'clsx';
import cloneDeep from 'lodash/cloneDeep';
import './index.less';

interface IResumeEditor {
  formData: any;
  setFormData: (data: any) => void;
}

const getMoudleListItems = (moduleName: string) =>
  defaultResumeModule.filter((module) => module.moduleName === moduleName)[0]
    .list[0];

const getDefaultListItemsValue = (moduleName: string) => {
  return getMoudleListItems(moduleName).reduce((prev, cur) => {
    prev[cur.propName] = cur.defaultValue;
    return prev;
  }, {} as Record<string, any>);
};

export default function ResumeEditor({ formData, setFormData }: IResumeEditor) {
  const [resumeModule, setResumeModule] = useSafeState(defaultResumeModule);
  const [hoverMoudleName, setHoverMoudleName] = useSafeState('');
  const [moduleState, setModuleState] = useSetState(
    resumeModule.reduce((prev, cur) => {
      prev[cur.moduleName] = { visible: cur.defaultVisibility };
      return prev;
    }, {} as Record<string, { visible: boolean }>)
  );
  const form = useForm({ initialValues: formData });
  const submitHandle = (data: any) => {
    console.log('submit', data);
  };

  const mouseEnterHandle = (moduleName: string) =>
    setHoverMoudleName(moduleName);
  const mouseLeaveHandle = () => setHoverMoudleName('');

  const addMoudleListItem = (moduleName: string) => {
    const listItems = getMoudleListItems(moduleName);
    const rm = resumeModule;
    rm.forEach((module) => {
      if (module.moduleName === moduleName) {
        module.list.push(listItems);
      }
    });
    setResumeModule(rm);
    form.insertListItem(moduleName, getDefaultListItemsValue(moduleName));
  };

  useUpdateEffect(() => {
    setFormData(form.values);
  }, [form.values]);

  return (
    <div className="ResumeEditor">
      <Paper className="moduleContainer" shadow="xs" p="sm" radius={4}>
        <Stack>
          <Title className="title" order={4}>
            模板管理
          </Title>
          {resumeModule.map(({ icon, moduleLabel, moduleName, require }) => (
            <Flex
              className={clsx(
                'moduleItem',
                moduleName,
                hoverMoudleName === moduleName ? 'hover' : ''
              )}
              align="center"
              justify="space-between"
              key={moduleName}
              onMouseEnter={() => mouseEnterHandle(moduleName)}
              onMouseLeave={() => mouseLeaveHandle()}
              onDoubleClick={() =>
                document
                  .querySelector(`.moduleBox.${moduleName}`)
                  ?.scrollIntoView()
              }
            >
              <Image src={icon} width={22} height={22} radius={11} />
              <Text>
                {moduleLabel === '工作/实习经历' ? '工作经历' : moduleLabel}
              </Text>
              <Switch
                sx={{
                  '.mantine-Switch-track': {
                    cursor: require ? 'not-allowed' : 'pointer',
                  },
                }}
                checked={moduleState[moduleName].visible}
                onChange={(event) => {
                  if (require) return;
                  setModuleState({
                    [moduleName]: { visible: event.currentTarget.checked },
                  });
                }}
              />
            </Flex>
          ))}
        </Stack>
      </Paper>

      <form
        className="form"
        onSubmit={form.onSubmit((values) => submitHandle(values))}
      >
        <Paper shadow="xs" p={0} radius={4}>
          {resumeModule.map(
            ({ moduleLabel, moduleName, multiple, list }, index) =>
              moduleState[moduleName].visible && (
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
                            <Tooltip label="删除条目" position="bottom">
                              <ActionIcon size="lg" variant="transparent">
                                <IconCircleMinus size={26} />
                              </ActionIcon>
                            </Tooltip>
                          </Flex>
                        )}
                        <SimpleGrid cols={2} verticalSpacing="sm">
                          {arr.map(({ type, propName, ...rest }) => (
                            <FormRenderer
                              key={propName}
                              type={type}
                              {...rest}
                              {...(type === FormType.richTextEditor
                                ? {
                                    onRichTextEditorUpdate(htmlText) {
                                      form.setFieldValue(
                                        `${moduleName}.${listIndex}.${propName}`,
                                        htmlText
                                      );
                                    },
                                  }
                                : form.getInputProps(
                                    `${moduleName}.${listIndex}.${propName}`
                                  ))}
                            />
                          ))}
                        </SimpleGrid>
                      </Fragment>
                    ))}
                  </div>

                  {multiple && (
                    <Flex justify="center" sx={{ marginTop: '20px' }}>
                      <Tooltip label="添加新条目" position="bottom">
                        <ActionIcon size="lg" variant="transparent" onClick={()=>addMoudleListItem(moduleName)}>
                          <IconCirclePlus size={26} />
                        </ActionIcon>
                      </Tooltip>
                    </Flex>
                  )}
                </div>
              )
          )}
        </Paper>
        <Button className="saveButton" type="submit">
          保存
        </Button>
      </form>
    </div>
  );
}
