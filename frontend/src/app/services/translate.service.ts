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
    }, {
      ID: 'name',
      de: 'Name',
      en: 'Name'
    },
    {
      ID: 'image',
      de: 'Foto',
      en: 'Photo'
    },
    {
      ID: 'description',
      de: 'Beschreibung',
      en: 'Description'
    },
    {
      ID: 'email',
      de: 'Email',
      en: 'Email'
    },
    {
      ID: 'address',
      de: 'Adresse',
      en: 'Address'
    },
    {
      ID: 'category',
      de: 'Kategorie',
      en: 'Category'
    },
    {
      ID: 'searchDropDown.name',
      de: 'Suche nach Name',
      en: 'Search by name'
    },
    {
      ID: 'searchDropDown.description',
      de: 'Suche nach Beschreibung',
      en: 'Search by description'
    },
    {
      ID: 'searchDropDown.email',
      de: 'Suche nach E-Mail',
      en: 'Search by email'
    },
    {
      ID: 'searchDropDown.address',
      de: 'Suche nach Adresse',
      en: 'Search by address'
    }, {
      ID: 'searchDropDown.category',
      de: 'Suche nach Kategorie',
      en: ' Search by category'
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
