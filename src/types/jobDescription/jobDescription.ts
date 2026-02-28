import { addAsyncActionPostfixes } from '@/utils/actionTypeCreator';

export const jobDescriptionTypes = {
  ...addAsyncActionPostfixes({
    PARSE_BH_JDG: 'PARSE_BH_JDG',
    JOB_DESC_GENERATOR: 'JOB_DESC_GENERATOR',
    RELATED_ENTRIES: 'RELATED_ENTRIES'
  }),
  UPDATE_JDG_VERSION: 'UPDATE_JDG_VERSION',
  SET_DESCRIPTION_STYLE: 'SET_DESCRIPTION_STYLE',
  CACHED_PARSE_BH_JDG: 'CACHED_PARSE_BH_JDG',
  TEST_DISPATCH: 'TEST_DISPATCH'
};
