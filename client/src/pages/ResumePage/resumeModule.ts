import { FormType, IFormItem } from "./FormRenderer";

export type IResumeModuleItem = IFormItem & { propName: string };

export interface IResumeModule {
  moduleLabel: string;
  moduleName: string;
  require: boolean;
  list: Array<IResumeModuleItem>;
}

export const resumeModule: IResumeModule[] = [
  {
    moduleLabel: '基本信息',
    moduleName: 'basicInfo',
    require: true,
    list: [
      {
        propName: 'fullname',
        label: '姓名',
        required: true,
        type: FormType.input,
        placeholder: '请输入姓名',
      },
      {
        propName: 'age',
        label: '年龄',
        required: true,
        type: FormType.input,
        placeholder: '请输入年龄',
      },
      {
        propName: 'gender',
        label: '性别',
        required: true,
        type: FormType.select,
        selectData: ['男', '女'],
        defaultValue: '男',
      },
      {
        propName: 'degree',
        label: '学历',
        required: true,
        type: FormType.select,
        selectData: [
          '小学',
          '初中',
          '高中',
          '中专',
          '大专',
          '本科',
          '硕士',
          '博士',
          '其他',
        ],
        defaultValue: '本科',
      },
      {
        propName: 'tel',
        label: '电话',
        required: true,
        type: FormType.input,
        placeholder: '请输入电话号码',
      },
      {
        propName: 'politics',
        label: '政治面貌',
        required: false,
        type: FormType.select,
        selectData: ['团员', '党员', '群众', '其他'],
        placeholder: '请选择政治面貌',
      },
      {
        propName: 'email',
        label: '邮箱',
        required: false,
        type: FormType.input,
        placeholder: '请输入邮箱',
      },
      {
        propName: 'school',
        label: '毕业院校',
        required: false,
        type: FormType.input,
        placeholder: '请输入毕业院校',
      },
    ],
  },
  {
    moduleLabel: '教育背景',
    moduleName: 'education',
    require: false,
    list: [
      {
        propName: 'entranceTime',
        label: '入学时间',
        required: true,
        type: FormType.datepicker,
        placeholder: '请选择入学时间',
      },
      {
        propName: 'graduationTime',
        label: '毕业时间',
        required: true,
        type: FormType.datepicker,
        placeholder: '请选择毕业时间',
      },
      {
        propName: 'schoolpropName',
        label: '学校名称',
        required: true,
        type: FormType.input,
        placeholder: '请输入学校名称',
      },
      {
        propName: 'majorpropName',
        label: '专业名称',
        required: true,
        type: FormType.input,
        placeholder: '请输入专业名称',
      },
      {
        propName: 'highestEducation',
        label: '最高学历',
        required: true,
        type: FormType.select,
        selectData: [
          '小学',
          '初中',
          '高中',
          '中专',
          '大专',
          '本科',
          '硕士',
          '博士',
          '其他',
        ],
        placeholder: '请选择学历',
      },
    ],
  },
  {
    moduleLabel: '专业技能',
    moduleName: 'professional',
    require: false,
    list: [
      {
        propName: 'skill',
        label: '',
        required: false,
        disable: false,
        type: FormType.richTextEditor,
        placeholder: '请填写您的专业技能',
      },
    ],
  },
  {
    moduleLabel: '工作/实习经历',
    moduleName: 'job',
    require: false,
    list: [
      {
        propName: 'entryTime',
        label: '入职时间',
        required: true,
        type: FormType.datepicker,
        placeholder: '请选择入职时间',
      },
      {
        propName: 'dimissionTime',
        label: '离职时间',
        required: true,
        disable: false,
        type: FormType.datepicker,
        placeholder: '请选择离职时间',
      },
      {
        propName: 'company',
        label: '公司名称',
        required: true,
        disable: false,
        type: FormType.input,
        placeholder: '请输入公司名称',
      },
      {
        propName: 'post',
        label: '职位',
        required: true,
        disable: false,
        type: FormType.input,
        placeholder: '请输入职位',
      },
      {
        propName: 'responsibility',
        label: '岗位职责',
        required: false,
        disable: false,
        type: FormType.richTextEditor,
        placeholder: '请填写您的岗位职责',
      },
    ],
  },
  {
    moduleLabel: '项目经历',
    moduleName: 'project',
    require: false,
    list: [
      {
        propName: 'company',
        label: '所属公司',
        required: true,
        type: FormType.input,
        placeholder: '请输入项目所属公司',
      },
      {
        propName: 'startTime',
        label: '开始时间',
        required: true,
        type: FormType.datepicker,
        placeholder: '请选择项目开始时间',
      },
      {
        propName: 'endTime',
        label: '结束时间',
        required: true,
        type: FormType.datepicker,
        placeholder: '请选择项目结束时间',
      },
      {
        propName: 'describe',
        label: '项目描述',
        required: true,
        type: FormType.richTextEditor,
        placeholder: '请填写项目描述',
      },
      {
        propName: 'framework',
        label: '项目架构',
        required: false,
        type: FormType.richTextEditor,
        placeholder: '请填写项目架构',
      },
      {
        propName: 'responsibility',
        label: '职责描述',
        required: false,
        type: FormType.richTextEditor,
        placeholder: '请填职责描述',
      },
    ],
  },
  {
    moduleLabel: '自我评价',
    moduleName: 'evaluate',
    require: false,
    list: [
      {
        propName: 'detail',
        label: '',
        required: false,
        type: FormType.richTextEditor,
        placeholder: '请填写自我评价',
      },
    ]
  }
];