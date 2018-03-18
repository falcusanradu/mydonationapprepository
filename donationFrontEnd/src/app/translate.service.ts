import {Injectable} from '@angular/core';

@Injectable()
export class Translate {


  Language: string = 'en';

  Translations = [
    // Question Page

    {
      ID: 'forgot_password',
      de: 'haben Sie den Kennwort vergessen?',
      en: 'forgot password?'
    },
    {
      ID: 'test',
      de: 'german',
      en: 'english'
    },


    // -----------------------------------------------------------------------------------

    //
  ];

  public getTranslatedItem(ElementID): string {
    for (let i of this.Translations) {
      if (i.ID === ElementID)
        return i[this.Language];
    }
  }

  constructor() {
  }
}
