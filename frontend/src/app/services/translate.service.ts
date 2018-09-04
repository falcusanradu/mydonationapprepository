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
    }, {
      ID: 'searchDropDown.contact',
      de: 'Suche nach Kontakt',
      en: ' Search by contact'
    }, {
      ID: 'searchByUsername',
      de: 'Suche nach Benutzername',
      en: ' Search by username'
    },
    {
      ID: 'OCNFIRMATION_INCORRECT',
      de: 'Bestätigungspasswort falsch!',
      en: 'confirmation password incorrect!'
    }, {
      ID: 'USERNAME_EXISTS',
      de: 'Benutzername existiert',
      en: 'username exists'
    }, {
      ID: 'EMAIL_EXISTS',
      de: 'E-Mail existiert',
      en: 'email exists'
    }, {
      ID: 'INVALID_USERNAME_OR_PASSWORD',
      de: 'ungültiger Benutzername oder Passwort\n',
      en: 'Invalid username or password'
    }, {
      ID: 'LOGIN_FAILED',
      de: 'Anmeldung fehlgeschlagen',
      en: 'login failed'
    }, {
      ID: 'USERNAME_OR_PASSWORD_CANNOT_BE_NULL',
      de: 'Benutzername oder Passwort dürfen nicht leer sein',
      en: 'username or password can\'t be empty'
    }, {
      ID: 'Login',
      de: 'Anmeldung',
      en: 'Login'
    }, {
      ID: 'Username',
      de: 'Benutzername',
      en: 'Username'
    }, {
      ID: 'Password',
      de: 'Kennwort',
      en: 'Password'
    }, {
      ID: 'Register',
      de: 'Registrierung',
      en: 'Register'
    }, {
      ID: 'Email',
      de: 'E-Mail',
      en: 'Email'
    }, {
      ID: 'ConfirmPassword',
      de: 'Bestätige das Passwort',
      en: 'Confirm password'
    }, {
      ID: 'RegisterSuccess',
      de: 'Registrierung erfolgreich!',
      en: 'register success!'
    }, {
      ID: 'searchByUsername',
      de: 'Suche nach Benutzername',
      en: ' Search by username'
    }, {
      ID: 'searchByUsername',
      de: 'Suche nach Benutzername',
      en: ' Search by username'
    }, {
      ID: 'searchByUsername',
      de: 'Suche nach Benutzername',
      en: ' Search by username'
    }, {
      ID: 'searchByUsername',
      de: 'Suche nach Benutzername',
      en: ' Search by username'
    }, {
      ID: 'searchByUsername',
      de: 'Suche nach Benutzername',
      en: ' Search by username'
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
