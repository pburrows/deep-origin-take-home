# Task Execution POC

## Startup

run `npm install` then `npm run dev`

or

run `npm install` then build and run the included Dockerfile

## Usage

Browse to `/tasks/list` to start the application. This will load any existing tasks and start the server-side task execution loop.

Create some tasks using the create new task button. 

note: If you just press "Create New Task" and then immediately press the 'Create Task' button, it will schedule a new task 1 minute from the current date.

## Details

Tasks are stored as .json files in a data/tasks folder. Tasks are named after their next execution time and are deleted after they are executed. 