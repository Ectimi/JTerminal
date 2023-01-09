import { Container, Flex, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { Fragment } from 'react';
import { IFormItem, FormRenderer } from '../FormRenderer';
import './index.less';

type IResumeModuleItem = Omit<IFormItem, 'form'>

interface IResumeModule {
  title: string;
  require: boolean;
  list: Array<IResumeModuleItem>;
}

const defaultResumeModule: IResumeModule[] = [
  {
    title: '基本信息',
    require: true,
    list: [
      {
        propName: 'fullname',
        label: '姓名',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入姓名'
      },
      {
        propName: 'birth',
        label: '出生年月',
        required: true,
        disable: false,
        type: 'datepicker',
        placeholder:'请选择出生日期'
      },
      {
        propName: 'gender',
        label: '性别',
        required: true,
        disable: false,
        type: 'select',
        selectData:[
          {value:'male',label:'男'},
          {value:'female',label:'女'},
        ],
        defaultSelected:'male'
      },
      {
        propName: 'degree',
        label: '学历',
        required: true,
        disable: false,
        type: 'select',
        selectData:['小学','初中','高中','中专','大专','本科','硕士','博士','其他'],
        defaultSelected:'本科'
      },
      {
        propName: 'tel',
        label: '电话',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入电话号码'
      },
      {
        propName: 'politics',
        label: '政治面貌',
        required: true,
        disable: false,
        type: 'select',
        selectData:['团员','党员','群众','其他'],
        placeholder:'请选择政治面貌'
      },
      {
        propName: 'email',
        label: '邮箱',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入邮箱'
      },
      {
        propName: 'school',
        label: '毕业院校',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入毕业院校'
      },
    ],
  },
  {
    title: '教育背景',
    require: false,
    list: [
      {
        propName: 'entranceTime',
        label: '入学时间',
        required: true,
        disable: false,
        type: 'datepicker',
        placeholder:'请选择入学时间'
      },
      {
        propName: 'graduationTime',
        label: '毕业时间',
        required: true,
        disable: false,
        type: 'datepicker',
        placeholder:'请选择毕业时间'
      },
      {
        propName: 'schoolpropName',
        label: '学校名称',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入学校名称'
      },
      {
        propName: 'majorpropName',
        label: '专业名称',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入专业名称'
      },
      {
        propName: 'highestEducation',
        label: '最高学历',
        required: true,
        disable: false,
        type: 'select',
        selectData:['小学','初中','高中','中专','大专','本科','硕士','博士','其他'],
        placeholder:'请选择学历'
      },
    ],
  },
  {
    title: '工作/实习经历',
    require: false,
    list: [
      {
        propName: 'entryTime',
        label: '入职时间',
        required: true,
        disable: false,
        type: 'datepicker',
        placeholder:'请选择入职时间'
      },
      {
        propName: 'dimissionTime',
        label: '离职时间',
        required: true,
        disable: false,
        type: 'datepicker',
        placeholder:'请选择离职时间'
      },
      {
        propName: 'company',
        label: '公司名称',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入公司名称'
      },
      {
        propName: 'post',
        label: '职位',
        required: true,
        disable: false,
        type: 'input',
        placeholder:'请输入职位'
      },
      {
        propName: 'responsibility',
        label: '岗位职责',
        required: true,
        disable: false,
        type: 'richTextEditor',
        placeholder:'请填写工作职责'
      },
    ],
  },
];

export default function ResumeEditor() {
  const form = useForm({
    initialValues: {
      fullname: 'aa',
    },
  });

  return (
    <div className="ResumeEditor">
      <form>
        {defaultResumeModule.map((module) => (
          <Fragment key={module.title}>
            <Title order={4}>{module.title}</Title>
            {module.list.map(({ type, propName, ...rest }) => (
              <FormRenderer
                key={propName}
                type={type}
                propName={propName}
                form={form}
                {...rest}
              />
            ))}
          </Fragment>
        ))}
      </form>
    </div>
  );
}
