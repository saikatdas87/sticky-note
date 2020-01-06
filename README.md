# sticky-note

> An application for managing sticky notes (CRUD)

> Notes can be easily created, searched, updated and deleted by using this application.

> Notes are persisted in Database


## Used technologies

* [Java 8](https://www.oracle.com/technetwork/java/javase/overview/java8-2100321.html)
* [Angular: 8.x.x](https://angular.io/)
* [Angular CLI: 8.0.3](https://cli.angular.io/)
* [Spring Boot](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/)
* [Postgresql](https://www.postgresql.org/)
* [Maven](https://maven.apache.org/)
* [Spring JPA](https://spring.io/projects/spring-data-jpa)

### Prerequisites

* [Node.js](https://nodejs.org/) (version 12 or higher)
* [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html) (version 1.8 or higher)
* [NPM](https://www.npmjs.com/get-npm) (Version 6.13.*)

### Let's get started,

* Clone this repository.
* Install maven dependencies
* Set up empty postgresql database (as this app is using postgresql db by default). Then change the db related configurations in application.conf file which you can find in below path

```
    ├── src/main/resources/
    │     ├── application.properties
```
* When running the app (frontend and backend), the application can be accessed with two default urls

```
    http://localhost:8080   (Backend application which will list down the APIs by default)
    http://localhost:4200/  (Frontend application)
```

If you want to access the application with only http://localhost:8080/ then please follow below commands 

```
    mvn spring-boot:run
```

Can be ran directly from IntelliJ IDEA by going to `com.saikat.code.stickynote.StickyNoteApplication` and clicking run.

Build Spring Boot Project with Maven

   ```maven package```

Or
    
    mvn install / mvn clean install


## Running UI

* Go to `ui` directory and install dependencies by `npm install`

#### Development server

Run `ng serve` from the ui folder for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Build

Run `ng build` to build the project from `ui` directory. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

#### Running unit tests

Run `ng test` from `ui` folder to execute the unit tests via [Karma](https://karma-runner.github.io).


#### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
