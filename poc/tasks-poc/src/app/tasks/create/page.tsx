import React from "react";
import {CreateTaskForm} from "@/components/create-task-form";

export default async function TasksPage() {
    return <div>
        <CreateTaskForm />
    </div>
}
export const dynamic = 'force-dynamic'
