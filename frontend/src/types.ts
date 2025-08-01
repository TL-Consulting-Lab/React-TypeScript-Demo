export type TaskCategory = 'work' | 'personal' | 'urgent';

export interface Task {
    id: number;
    title: string;
    completed: boolean;
    category: TaskCategory;
    createdAt: Date;
}