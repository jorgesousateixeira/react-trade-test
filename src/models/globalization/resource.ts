import {Translation} from './translation';

export interface Resource {
  ResourceSetCode: string;
  Code: string;
  Translations: Translation[];
}
