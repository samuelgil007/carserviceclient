# Detalles de las funcionalidades añadidas en el laboratorio

  Para comenzar, se le añadieron tres modulos nuevos:
  - owner-service = En este modulo esta el servicio con los metodos crud asincronos que estan ligados
  a la api.
  - owner-list = En este modulo se despliega la lista de owners existentes en la api, este modulo no 
  tiene ruta propia, ya que se despliega en la ruta car-list junto con la lista de carros.
  - owner-edit = En este modulo se despliega la informacion para la edicion para un owner parecido al edit de los carros. 
  
  Con ayuda de los tres modulos nuevos anteriores, se construyeron estas nuevas funcionalidades:
  
  - Se puede desplegar una lista de los carros con sus owners. 
  - Se permite agregarle el owner al carro desde car-edit. 
  - Se puede desplegar una lista de los owners. 
  - Se pueden crear o actualizar los owners desde owner-edit. 
  - Se puede eliminar varios owners al tiempo en la ruta car-list. 
  - Al eliminarse un owner se elimina la relación que este tiene con un carro.

# CarServiceClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
