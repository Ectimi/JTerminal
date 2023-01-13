import { FormType, IFormItem } from './FormRenderer';
import BasicImage from '@/assets/images/resumeModuleIcon/basic.png';
import EducateImage from '@/assets/images/resumeModuleIcon/educate.png';
import HonourImage from '@/assets/images/resumeModuleIcon/honour.png';
import JobImage from '@/assets/images/resumeModuleIcon/job.png';
import PhotoImage from '@/assets/images/resumeModuleIcon/photo.png';
import ProjectImage from '@/assets/images/resumeModuleIcon/project.png';
import SelfImage from '@/assets/images/resumeModuleIcon/self.png';
import SkillImage from '@/assets/images/resumeModuleIcon/skill.png';
import StuImage from '@/assets/images/resumeModuleIcon/stu.png';

export type IResumeModuleItem = Omit<IFormItem, 'onChange'> & {
  propName: string;
};

export enum EResumeModuleType {
  'basic' = 'basic',
  'education' = 'education',
  'campus' = 'campus',
  'professional' = 'professional',
  'job' = 'job',
  'project' = 'project',
  'honour' = 'honour',
  'evaluate' = 'evaluate',
  'customer' = 'customer',
}

export interface IResumeModule {
  moduleLabel: string;
  moduleName: string;
  visible: boolean;
  multiple: boolean;
  icon: any;
  require: boolean;
  list: IResumeModuleItem[][];
}

export const defaultResumeModule: IResumeModule[] = [
  // 基本信息
  {
    moduleName: EResumeModuleType.basic,
    moduleLabel: '基本信息',
    visible: true,
    multiple: false,
    icon: BasicImage,
    require: true,
    list: [
      [
        {
          propName: 'fullname',
          label: '姓名',
          required: true,
          type: FormType.input,
          placeholder: '请输入姓名',
          value: '',
        },
        {
          propName: 'age',
          label: '年龄',
          required: true,
          type: FormType.input,
          placeholder: '请输入年龄',
          value: '',
        },
        {
          propName: 'gender',
          label: '性别',
          required: true,
          type: FormType.select,
          selectData: ['男', '女'],
          value: '男',
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
          value: '本科',
        },
        {
          propName: 'tel',
          label: '电话',
          required: true,
          type: FormType.input,
          placeholder: '请输入电话号码',
          value: '',
        },
        {
          propName: 'politics',
          label: '政治面貌',
          required: false,
          type: FormType.select,
          selectData: ['团员', '党员', '群众', '其他'],
          placeholder: '请选择政治面貌',
          value: '',
        },
        {
          propName: 'email',
          label: '邮箱',
          required: false,
          type: FormType.input,
          placeholder: '请输入邮箱',
          value: '',
        },
        {
          propName: 'school',
          label: '毕业院校',
          required: false,
          type: FormType.input,
          placeholder: '请输入毕业院校',
          value: '',
        },
      ],
    ],
  },

  // 教育背景
  {
    moduleName: EResumeModuleType.education,
    moduleLabel: '教育背景',
    visible: true,
    multiple: true,
    icon: EducateImage,
    require: false,
    list: [
      [
        {
          propName: 'entranceTime',
          label: '入学时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择入学时间',
          value: null,
        },
        {
          propName: 'graduationTime',
          label: '毕业时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择毕业时间',
          value: null,
        },
        {
          propName: 'schoolpropName',
          label: '学校名称',
          required: true,
          type: FormType.input,
          placeholder: '请输入学校名称',
          value: '',
        },
        {
          propName: 'majorpropName',
          label: '专业名称',
          required: true,
          type: FormType.input,
          placeholder: '请输入专业名称',
          value: '',
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
          value: '本科',
        },
      ],
    ],
  },

  // 校园经历
  {
    moduleName: EResumeModuleType.campus,
    moduleLabel: '校园经历',
    visible: false,
    multiple: true,
    icon: StuImage,
    require: false,
    list: [
      [
        {
          propName: 'startTime',
          label: '开始时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择开始时间',
          value: null,
        },
        {
          propName: 'endTime',
          label: '结束时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择结束时间',
          value: null,
        },
        {
          propName: 'department',
          label: '部门/社团名称',
          required: true,
          type: FormType.input,
          placeholder: '请输入部门/社团名称',
          value: '',
        },
        {
          propName: 'detail',
          label: '部门/社团名称',
          required: true,
          type: FormType.richTextEditor,
          placeholder: '请填写具体经历',
          value: '',
        },
      ],
    ],
  },

  // 专业技能
  {
    moduleName: EResumeModuleType.professional,
    moduleLabel: '专业技能',
    visible: true,
    multiple: false,
    require: false,
    icon: SkillImage,
    list: [
      [
        {
          propName: 'skill',
          label: '',
          required: false,
          disable: false,
          type: FormType.richTextEditor,
          placeholder: '请填写您的专业技能',
          value: '',
        },
      ],
    ],
  },

  // 工作/实习经历
  {
    moduleName: EResumeModuleType.job,
    moduleLabel: '工作/实习经历',
    visible: true,
    multiple: true,
    icon: JobImage,
    require: false,
    list: [
      [
        {
          propName: 'entryTime',
          label: '入职时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择入职时间',
          value: null,
        },
        {
          propName: 'dimissionTime',
          label: '离职时间',
          required: true,
          disable: false,
          type: FormType.datepicker,
          placeholder: '请选择离职时间',
          value: null,
        },
        {
          propName: 'company',
          label: '公司名称',
          required: true,
          disable: false,
          type: FormType.input,
          placeholder: '请输入公司名称',
          value: '',
        },
        {
          propName: 'post',
          label: '职位',
          required: true,
          disable: false,
          type: FormType.input,
          placeholder: '请输入职位',
          value: '',
        },
        {
          propName: 'responsibility',
          label: '岗位职责',
          required: false,
          disable: false,
          type: FormType.richTextEditor,
          placeholder: '请填写您的岗位职责',
          value: '',
        },
      ],
    ],
  },

  // 项目经历
  {
    moduleName: EResumeModuleType.project,
    moduleLabel: '项目经历',
    visible: false,
    multiple: true,
    icon: ProjectImage,
    require: false,
    list: [
      [
        {
          propName: 'company',
          label: '所属公司',
          required: true,
          type: FormType.input,
          placeholder: '请输入项目所属公司',
          value: '',
        },
        {
          propName: 'startTime',
          label: '开始时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择项目开始时间',
          value: null,
        },
        {
          propName: 'endTime',
          label: '结束时间',
          required: true,
          type: FormType.datepicker,
          placeholder: '请选择项目结束时间',
          value: null,
        },
        {
          propName: 'describe',
          label: '项目描述',
          required: true,
          type: FormType.richTextEditor,
          placeholder: '请填写项目描述',
          value: '',
        },
        {
          propName: 'framework',
          label: '项目架构',
          required: false,
          type: FormType.richTextEditor,
          placeholder: '请填写项目架构',
          value: '',
        },
        {
          propName: 'responsibility',
          label: '职责描述',
          required: false,
          type: FormType.richTextEditor,
          placeholder: '请填职责描述',
          value: '',
        },
      ],
    ],
  },

  // 荣誉奖励
  {
    moduleName: EResumeModuleType.honour,
    moduleLabel: '荣誉奖励',
    visible: false,
    multiple: false,
    icon: HonourImage,
    require: false,
    list: [
      [
        {
          propName: 'detail',
          label: '',
          required: false,
          type: FormType.richTextEditor,
          placeholder: '请填写荣誉奖励',
          value: '',
        },
      ],
    ],
  },

  // 自我评价
  {
    moduleName: EResumeModuleType.evaluate,
    moduleLabel: '自我评价',
    visible: true,
    multiple: false,
    icon: SelfImage,
    require: false,
    list: [
      [
        {
          propName: 'detail',
          label: '',
          required: false,
          type: FormType.richTextEditor,
          placeholder: '请填写自我评价',
          value: '',
        },
      ],
    ],
  },
];
