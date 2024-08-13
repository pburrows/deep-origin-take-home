"use server"
import path from "node:path";
import * as fs from "node:fs/promises";
import {Task} from "@/app/tasks/task-models";
import {isFuture} from "date-fns";

export async function getTasks(): Promise<Task[]> {
    await startTaskExecutionLoop()
    return readTasksFromDisk()
}


export async function createNewTask(task: Task) {
    // todo: validation
    console.log(JSON.stringify(task))

    const taskPath = await getTasksPath();
    const taskFileName = task.startDate.toISOString().replaceAll(':','^') + '.json'
    const taskContents = JSON.stringify(task, null, 2);
    const taskFilePath = path.join(taskPath,taskFileName);
    await fs.writeFile(taskFilePath, taskContents);
}

async function readTasksFromDisk(): Promise<Task[]> {
    const tasksPath = await getTasksPath()
    const files = await fs.readdir(tasksPath);
    const results: Task[] = []

    for (const fileName of files) {
        const filePath = path.join(tasksPath, fileName)
        const fileJson = await fs.readFile(filePath, 'utf8');
        results.push(JSON.parse(fileJson))
    }

    return results;
}

async function getTasksPath() {
    const basePath = process.env.TASKS_PATH ?? './'
    const fullPath = path.join(basePath, 'data', 'tasks');

    await fs.mkdir(fullPath, {recursive: true})
    return fullPath;
}

let intervalRef;
async function startTaskExecutionLoop() {
    intervalRef = setInterval(()=>{
        checkTaskExecution().then()
    }, 1000)
}

function queueNextRepetition(task: Task) {
    // todo: calculate next repetition date and rewrite the task to disk
}

async function checkTaskExecution() {
    const tasksPath = await getTasksPath()
    const files = await fs.readdir(tasksPath);

    for (const fileName of files) {
        const executionDate = fileName.replaceAll('^',':').replace('.json', '');
        const now = new Date()
        const timeToExecute = !isFuture(executionDate);
        if(timeToExecute) {
            const filePath = path.join(tasksPath, fileName)
            const fileJson = await fs.readFile(filePath, 'utf8');
            const task: Task = JSON.parse(fileJson)
            console.log('Executed task ' + task.name)
            if(task.repeats) {
                queueNextRepetition(task)
            } else {
                await fs.unlink(filePath);
            }
        }

    }

    console.log('task execution complete')

}