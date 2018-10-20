### how 2 start
- git clone https://github.com/LordMidi/ng-contacts.git
- npm install
- npx ng serve
- open http://localhost:4200/

### Aufgabe: Mini-Kontaktverwaltung
Bitte erstelle eine kleine Kontaktverwaltung mit Angular.

Die erfassten Kontakte sollen auf einem Server per REST-API gespeichert und
abgerufen werden können. Eine In-Memory Implementierung ist ausreichend.
Das Frontend zeigt alle erfassten Kontakte in einer Liste mit ihren Namen,
Geburtsjahr und Personalnummer an. Beim Klick auf einen Kontakt erscheint
eine Detailansicht dieser Person mit den Feldern Name, Vorname,
Geburtsdatum (Tag.Monat.Jahr), Emailadresse, Personalnummer. In der
Detailansicht lassen sich zudem sämtliche Informationen zum ausgewählten
Kontakt bearbeiten.

Bei der Erfassung von Kontaktinformationen gelten folgende Kriterien:

- Die Personalnummer beginnt mit 3 Buchstaben gefolgt von einem Bindestrich und einer 6 stelligen Zahl. Die erste Stelle dieser 6 stelligen Zahl darf jedoch nicht mit 0 beginnen.
- Es muss eine gültige E-Mail-Adresse sein.
- Das Geburtsdatum wird im Format TT.MM.JJJJ angezeigt. Erfasste Personen müssen mindestens 18 Jahre alt sein.
- Das Geburtsdatum soll zudem auch folgende Eingaben unterstützen, die dann automatisch ins korrekte Datum transformiert werden.

- 111980 -> 01.01.1980

- 1.1.1980 -> 01.01.1980

- 12121980 -> 12.12.1980

- 2121980 -> 2121980

- Fehleingaben werden dem Nutzer kenntlich gemacht

# solution

## initalize app
- npx @angular/cli new ng-contacts --routing --style=scss

## generate contacts module & component
- npx ng generate module contacts --module app --routing
- npx ng generate component contacts/contacts --module contacts --flat

## generate contact module & component
- npx ng generate module contact --module app --routing
- npx ng generate component contact/contact --module contact --flat

## generate libs module
- npx ng generate module libs --module app

## generate contacts service in libs
- npx ng generate service libs/contacts/contacts

## generate contact model
- npx ng generate class libs/contacts/contact

## add ng bootstrap
- npm install --save bootstrap
- include minified Bootstrap CSS in angular.json

## add header
- add header element to global layout

## show contacts component as default for / route
- configure path in contacts module for contacts component
- configure path in app module for redirecting to contacts
- remove contacts module import from app module

## template for contacts component
- create dummy HTML for displaying contact list
- styling

## contact mock data
- create file exporting constant holding mocked contacts
- generate mock data

## use mock data for contacts service
- wrap mock into observable and provide getter function

## wire up contact route & component
- remove contact module import from app module
- add routing for module

## template for contact component
- create dummy HTML for displaying contact
- styling

## add routing links to contacts overview
- link into contact component with ids from contacts component list

## load contact to edit
- identify contact via url param
- fill component inputs with contact data

## save updated data
- extending contacts service to support updating contact

## add validation
- add form controls for validation
- implement custom validation for personnel number
- implement custom validation & extra parser for birthdate field values
- add error messages for invalid form fields

## tests
- fixed test