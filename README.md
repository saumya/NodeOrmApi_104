NodeOrmApi_104
======================

The API is developed with [Sequelize][1s] ORM. The development is made with [Express][express].

It has many different UI as different projects.
 
This is the base project for the API server.

A General Store/Inventory API is added for buying and selling product. 

No UI is implemented yet (Inverntory).



### Status

 - [x] checking from the UI
 - [x] basic API for all
 - [x] CRUD is done for most
 - [x] Test done from UI Application
 - [ ] General Error Handling


### How it works

 - Groups are made to separate different Organisations
 - DoctorGroups help separate different Doctors to different organisations

### API reference

 - /initDB (This is not an API, but a setup step)
 		- This setsup the Database and Tables
  	- Must be visited from the server as the first thing before moving on with the API
  	- 
 - Person : /getPersonWithId/:id
 - Doctor : /getDoctorWithId/:id
 - Group : /getGroupWithId/:id
 - DoctorGroup(Clinic) : /getDoctorGroupWithId/:id
 - Schedules By Doctor Id : /getSchedulesByDoctorId/:id
 - Schedules By Patient Id : /getSchedulesByPatientId/:id
 - Schedules By Clinic Id : /getScheduleByDoctorGroupId/:id
 - Schedules By Person Id : /getScheduleByPersonId/:id
 - Prescription By Patient Id : /getPrescriptionsByPatientId/:id
 - 



### Developing with this

Generated the application with `express-generator` and `npx` not `npm`.

```
npx express-generator --view=pug myNewApp
```

Installing the requirements.

```
npm install --save mysql2
npm install --save sequelize
```


### Reference and Further reading

[TypeORM][2s] looks interesting too.
 
 The old projects are here
 
 1. Node, MySQL [NodeOrmApi_101][1] 
 2. Node, MySQL [NodeOrmApi_102][2]

These are projects where I am trying to connect to SQL database. There are other projects connecting to NoSQL database.
 
 1. Node and MongoDB [NodeOrmApi_103][3]



























[1]: https://github.com/saumya/NodeOrmApi_101
[2]: https://github.com/saumya/NodeOrmApi_102
[3]: https://github.com/saumya/NodeOrmApi_103

[express]: http://expressjs.com/

[1s]: https://sequelize.org/
[2s]: https://typeorm.io/




