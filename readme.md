# Deep Origin Take Home Task

## Design a Distributed Task Scheduler

Design a distributed task scheduler in which a client can register a task and the time it should be executed. The task needs to be picked up and executed within 10 seconds of its scheduled time of execution. The tasks can be of two types:

* one-time task: These are scheduled at a specific time, and once executed will not be repeated again
* recurring tasks: These can be scheduled using Cron syntax and the system needs to execute them repeatedly according to the schedule

### Potential Use-Cases:

* Reminders in calendar applications
* Distributed cron
* Sending scheduled notifications to users

## Requirements

Be creative and dive into the product details. Add constraints and features you think would be important.

### Core Requirements

* A task is either one-time execution or recurring
* Clients must be able to register a task with either a specific time of execution or cron syntax for recurring tasks
* A task should be picked up for execution within 10 seconds of its scheduled execution

### High Level Requirements

* Design your high-level components so that they operate with high availability
* Ensure that the data in your system is durable, no matter what happens to any component in the system
* Describe how your system would behave while scaling-up and scaling-down
* Design your system to be cost-effective and provide a justification for it

## Expected Output

We expect two outputs - a design document and a small working prototype.

### Design Document

Create a design document of this system stating all critical design decisions, tradeoffs, components, services, and communications. Also specify how your system handles at scale, and what will eventually become a chokepoint (ie, scaling up/down to/from hundreds, thousands or millions of tasks).
Do NOT create unnecessary components, just to make design look complicated. A good design is always simple and elegant. A good way to think about it is if you were to create a separate process/machine/infra for each component and you will have to code it yourself, would you still do it?

### Prototype

To demonstrate your hands-on coding skills, build a small MVP prototype using TypeScript including a GUI using React that will allow to create, schedule and execute one-time and recurring tasks.

Once a task is executed it should be logged in a separate view in the Ul. The tasks don't need to actually execute anything, just be logged along with the exact time they got executed.
Please include detailed instructions on how to run the solution, preferably using Docker.
For extra credit, feel free to implement the following features as well:

* show the current list of scheduled tasks
* edit the schedule of a task delete a task
