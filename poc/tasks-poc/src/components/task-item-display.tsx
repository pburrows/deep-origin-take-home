"use client"
import {Task} from "@/app/tasks/task-models";
import {FC} from "react";
import {format, formatRelative} from "date-fns";

export interface Props {
    task: Task;
}

export const TaskItemDisplay: FC<Props> = ({task}) => {

    let formattedDate = formatRelative(task.startDate, new Date())
    return <li className={'border-b pb-2 border-gray-700'}>
        <div className={'flex justify-between gap-x-6 py-5'}>

            <div>
                <h3 className={'text-lg'}>{task.name}</h3>
            </div>
            <div>
                <p className={'text-sm'}>
                    {formattedDate}
                </p>
            </div>
        </div>
        <div>
            <p className={'text-sm text-gray-400'}>{task.description}</p>
        </div>
    </li>
}