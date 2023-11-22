import LanguageState from 'atom';

import { useRecoilValue } from 'recoil';
import { LANGUAGE_LIST } from 'util/language';

const useLanguage = (type: keyof typeof LANGUAGE_LIST) => {
  return LANGUAGE_LIST[type][useRecoilValue(LanguageState)];
};

export default useLanguage;
