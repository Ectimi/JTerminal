import { Button, Divider, SimpleGrid, Space, Paper } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useUpdateEffect } from 'ahooks';
import { Fragment } from 'react';
import { FormType, FormRenderer } from '../FormRenderer';
import { resumeModule } from '../resumeModule';
import './index.less';

interface IResumeEditor {
  formData: any;
  setFormData: (data: any) => void;
}

export default function ResumeEditor({ formData, setFormData }: IResumeEditor) {
  const form = useForm({ initialValues:formData });
  const submitHandle = (data: any) => {
    console.log('submit', data);
  };

  useUpdateEffect(() => {
    setFormData(form.values)
  }, [form.values]);

  return (
    <div className="ResumeEditor">
      <form
        className="form"
        onSubmit={form.onSubmit((values) => submitHandle(values))}
      >
        <Paper shadow="xs" p="sm">
          {resumeModule.map(({ moduleLabel, moduleName, list }, index) => (
            <Fragment key={moduleLabel}>
              {index !== 0 ? <Space h="sm" /> : null}
              <Divider
                my="sm"
                label={moduleLabel}
                labelPosition="center"
                labelProps={{ fz: 'lg', fw: 600 }}
              />
              <Space h="sm" />
              <SimpleGrid cols={3} verticalSpacing="sm">
                {list.map(({ type, propName, ...rest }) => (
                  <FormRenderer
                    key={propName}
                    type={type}
                    {...rest}
                    {...(type === FormType.richTextEditor
                      ? {
                          onRichTextEditorUpdate(htmlText) {
                            form.setFieldValue(
                              `${moduleName}.${propName}`,
                              htmlText
                            );
                          },
                        }
                      : form.getInputProps(`${moduleName}.${propName}`))}
                  />
                ))}
              </SimpleGrid>
            </Fragment>
          ))}
        </Paper>
        <Button className="saveButton" type="submit">
          保存
        </Button>
      </form>
    </div>
  );
}
