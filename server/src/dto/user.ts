import { Rule, RuleType, OmitDto, PickDto } from '@midwayjs/validate';

export class UserDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().min(1).max(30).empty().required())
  username: string;

  @Rule(RuleType.string().min(1).max(30).empty().required())
  password: string;
}

export class UserSettingDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  setting: string;
}

export class UserExcludeIdDTO extends OmitDto(UserDTO, ['id']) {}

export class UserOnlyIdDTO extends PickDto(UserDTO, ['id']) {}
