# nodeCourseTaskManager

This is project made as part of the course nodejs v2 udemy, is a project that evolution with the course and can be good 
to use as templates for other projects. rest api that allow the creation and management of users(create,delete,modified, change 
profile pic) with his task (and the state of the task if is finished).

## Getting Started

you have must have nodejs installed.
mongodb is needed can be locally or in a cluster

being in the directory of the project
npm init
create a folder config, inside the folder a file called dev.env and defined the enviroment variables
PORT=the port in wich the application should rund
SENDGRID_API_KEY=this project send emails and is need a sengrid api key, for this you should register in her website
JWT_SECRET=any string of text that works as part of the generation of the json web token
MONGODB_URL=the url of your mongodb database, if you are running locally this should work mongodb://127.0.0.1:27017/task-manager-api

for run the project just use
npm run dev

### Prerequisites
mongodb
nodejs

## Built With

* node js
* express 
* mongodb (mongoose)
* jwt
* sengrid


