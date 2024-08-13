export interface Task {
    name: string;
    description: string;
    startDate: Date;
    repeats?: TaskRepeat;
    notify: TaskNotifications;
}
export interface TaskRepeat {
    frequency: number;
    period: 'day' | 'week' | 'month' | 'year';
    on: string;
    ends: string;
}

export interface TaskNotifications {
    email?: string;
    sms?: string;
    push?: boolean;
}