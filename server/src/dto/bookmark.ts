import { Rule, RuleType, PickDto, OmitDto } from '@midwayjs/validate';

export class BookmarkItemDTO {
  @Rule(RuleType.number().required())
  id: number;

  @Rule(RuleType.string().required())
  name: string;

  @Rule(RuleType.string().required())
  url: string;

  @Rule(RuleType.string().required())
  icon: string;

  @Rule(RuleType.string().required())
  description: string;

  @Rule(RuleType.string().required())
  label: string;

  @Rule(RuleType.number().required())
  sticky: number;
}

export class BookmarkItemExcludeIconDTO extends OmitDto(BookmarkItemDTO, [
  'icon',
]) {}

export class BookmarkItemOnlyIdDTO extends PickDto(BookmarkItemDTO, ['id']) {}

export class BookmarkItemOnlyNameDTO extends PickDto(BookmarkItemDTO, [
  'name',
]) {}

export class BookmarkItemStickyDTO extends PickDto(BookmarkItemDTO, [
  'id',
  'sticky',
]) {}

export class UserBookmarkItemDTO extends BookmarkItemDTO {
  @Rule(RuleType.number().required())
  user_id: number;
}

export class LabelDTO {
  @Rule(RuleType.number())
  id: number;

  @Rule(RuleType.string())
  label: string;
}

export class UserLabelDTO extends LabelDTO {
  @Rule(RuleType.number().required())
  user_id: number;
}
