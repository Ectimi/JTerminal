import { Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IFormItem } from '../FormRenderer';
import './index.less';

interface IResumeModule {
  title: string;
  require: boolean;
  list: Array<IFormItem>;
}

const defaultResume: IResumeModule[] = [
  {
    title: '基本信息',
    require: true,
    list: [
      {
        name: 'name',
        label: '姓名',
        required: true,
        disable: false,
        type: 'input',
      },
      {
        name: 'birth',
        label: '出生年月',
        required: true,
        disable: false,
        type: 'datepicker',
      },
      {
        name: 'gender',
        label: '性别',
        required: true,
        disable: false,
        type: 'select',
      },
      {
        name: 'degree',
        label: '学历',
        required: true,
        disable: false,
        type: 'select',
      },
      {
        name: 'tel',
        label: '电话',
        required: true,
        disable: false,
        type: 'input',
      },
      {
        name: 'politics',
        label: '政治面貌',
        required: true,
        disable: false,
        type: 'input',
      },
      {
        name: 'email',
        label: '邮箱',
        required: true,
        disable: false,
        type: 'input',
      },
      {
        name: 'school',
        label: '毕业院校',
        required: true,
        disable: false,
        type: 'input',
      },
    ],
  },
  {
    title: '教育背景',
    require: false,
    list: [
      {
        name: 'entranceTime',
        label: '入学时间',
        required: true,
        disable: false,
        type: 'datepicker',
      },
      {
        name: 'graduationTime',
        label: '毕业时间',
        required: true,
        disable: false,
        type: 'datepicker',
      },
      {
        name: 'schoolName',
        label: '学校名称',
        required: true,
        disable: false,
        type: 'input',
      },
      {
        name: 'majorName',
        label: '专业名称',
        required: true,
        disable: false,
        type: 'datepicker',
      },
      {
        name: 'highestEducation',
        label: '最高学历',
        required: true,
        disable: false,
        type: 'datepicker',
      },
    ],
  },
  {
    title:'工作/实习经历',
    require:false,
    list:[
      {
        name: 'entryTime',
        label: '入职时间',
        required: true,
        disable: false,
        type: 'datepicker',
      },
      {
        name: 'dimissionTime',
        label: '离职时间',
        required: true,
        disable: false,
        type: 'datepicker',
      },
      {
        name: 'company',
        label: '公司名称',
        required: true,
        disable: false,
        type: 'input',
      },
      {
        name: 'post',
        label: '职位',
        required: true,
        disable: false,
        type: 'input',
      },
    ]
  }
];

export default function ResumeEditor() {
  const form = useForm({
    initialValues: {},
  });

  return (
    <div className="ResumeEditor">
      <form>
        <Title order={4}>基本信息</Title>
      </form>
    </div>
  );
}
