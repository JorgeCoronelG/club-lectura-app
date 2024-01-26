export enum OperatorsSqlEnum {
  CONTAIN = '%LIKE%',
  NOT_CONTAIN = 'NOT %LIKE%',
  EQUAL = '=',
  NOT_EQUAL = '!=',
  STARTS_WITH = 'LIKE%',
  ENDS_WITH = '%LIKE',
  IS_NULL = 'IS NULL',
  NOT_NULL = 'IS NOT NULL',
  GREATER_THAN = '>',
  GREATER_THAN_OR_EQUAL = '>=',
  LESS_THAN = '<',
  LESS_THAN_OR_EQUAL = '<='
}
