import {Project, ProjectStatus} from "../models/project";

type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static projectStateInstance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        return this.projectStateInstance || (this.projectStateInstance = new ProjectState())
    }

    addNewProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(
            Date.now().toString(),
            title,
            description,
            numberOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

export const projectState = ProjectState.getInstance();