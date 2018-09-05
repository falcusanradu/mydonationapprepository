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
      ID: 'WRONG_USERNAME_OR_PASSWORD',
      de: 'Benutzername oder Passwort ist falsch!!\n',
      en: 'wrong username or password!!'
    }, {
      ID: 'Invalid',
      de: 'Ungültiges',
      en: 'Invalid'
    }, {
      ID: 'Send',
      de: 'Senden',
      en: 'Send'
    }, {
      ID: 'OldPassword',
      de: 'Per E-Mail erhaltene Passwort',
      en: 'received password'
    }, {
      ID: 'New Password',
      de: 'Neues Kennwort',
      en: 'New Password'
    },
    {
      ID: 'New Password (Confirm)',
      de: 'Neues Kennwort (Bestätigung)',
      en: 'New Password (Confirm)'
    },
    {
      ID: 'Change password',
      de: 'Kennwort ändern',
      en: 'Change password'
    },
    {
      ID: 'enter your email',
      de: 'geben sie ihre E-Mail Adresse ein',
      en: 'enter your email'
    },
    {
      ID: 'Fields must not be empty',
      de: 'Felder dürfen nicht leer sein',
      en: 'Fields must not be empty'
    },
    {
      ID: 'you need to complete the fields before the company can be seen by others',
      de: 'Sie müssen die Felder ausfüllen, bevor das Unternehmen von anderen gesehen werden kann',
      en: 'you need to complete the fields before the company can be seen by others'
    },
    {
      ID: 'CompanyName',
      de: 'Unternehmen Name',
      en: 'Company Name'
    },
    {
      ID: 'Company Email',
      de: 'Unternehmen E-Mail',
      en: 'Company Email'
    },
    {
      ID: 'Company Address',
      de: 'Unterhehmen Adresse',
      en: 'Company Address'
    },
    {
      ID: 'Company Description',
      de: 'Unternehmen Beschreibung',
      en: 'Company Description'
    },
    {
      ID: 'Company Image',
      de: 'Unternehmen Foto',
      en: 'Company Image'
    },
    {
      ID: 'Category',
      de: 'Kategorie',
      en: 'Category'
    },
    {
      ID: 'Edit',
      de: 'Editierung',
      en: 'Edit'
    },
    {
      ID: 'Delete',
      de: 'Löschen',
      en: 'Delete'
    },
    {
      ID: 'Save actions',
      de: 'Aktionen speichern',
      en: 'Save actions'
    },
    {
      ID: 'test',
      de: 'test',
      en: 'test'
    },
    {
      ID: 'Cancel',
      de: 'Stornieren',
      en: 'Cancel'
    },
    {
      ID: 'Fields must not be empty',
      de: 'Felder dürfen nicht leer sein',
      en: 'Fields must not be empty'
    },
    {
      ID: 'date',
      de: 'Datum',
      en: 'Date'
    },
    {
      ID: 'from',
      de: 'Von',
      en: 'From'
    },
    {
      ID: 'message',
      de: 'Nachricht',
      en: 'Message'
    },
    {
      ID: 'Send notification',
      de: 'Nachricht senden',
      en: 'Send notification'
    },
    {
      ID: 'Message to',
      de: 'Nachricht zu',
      en: 'Message to'
    },
    {
      ID: 'read',
      de: 'gelesen',
      en: 'read'
    },
    {
      ID: 'type',
      de: 'Typ',
      en: 'Type'
    },
    {
      ID: 'action',
      de: 'Aktion',
      en: 'Action'
    },
    {
      ID: 'Are you sure that you want to delete the user?',
      de: 'Sind Sie sicher, dass Sie den Benutzer löschen möchten?',
      en: 'Are you sure that you want to delete the user?'
    },
    {
      ID: 'Navigate through pages',
      de: 'Navigieren Sie durch die Seiten',
      en: 'Navigate through pages'
    },
    {
      ID: 'Languages',
      de: 'Sprachen',
      en: 'Languages'
    },
    {
      ID: 'test',
      de: 'test',
      en: 'test'
    },
    {
      ID: 'test',
      de: 'test',
      en: 'test'
    },
    {
      ID: 'test',
      de: 'test',
      en: 'test'
    },
    {
      ID: 'test',
      de: 'test',
      en: 'test'
    }
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
