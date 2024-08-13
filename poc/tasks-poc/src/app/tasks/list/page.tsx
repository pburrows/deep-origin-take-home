import {getTasks} from "@/app/tasks/task-helpers";
import {TaskItemDisplay} from "@/components/task-item-display";
import Link from "next/link";
import {Button} from "@headlessui/react";

export default async function TaskListPage() {
    const tasks = await getTasks()

    return <div>
        <h1 className={'text-4xl'}>Scheduled Tasks</h1>
        <div className={'mt-2'}>
        <Link href={'/tasks/create'}
              className={'rounded bg-sky-600 py-2 px-4 text-sm text-white data-[hover]:bg-sky-500 data-[active]:bg-sky-700'}>
            Create New Task
        </Link>
        </div>
        <ul>
        {tasks.map((task)=> <TaskItemDisplay key={task.name +  task.startDate} task={task} />)}
        </ul>
    </div>
}

export const dynamic = 'force-dynamic'