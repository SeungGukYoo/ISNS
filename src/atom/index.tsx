import { atom } from 'recoil';
import { LanguageType } from '../..';

const LanguageState = atom<LanguageType>({
  key: 'language',
  default: localStorage.getItem('language') === 'ko' ? 'ko' : 'en',
});

export default LanguageState;
