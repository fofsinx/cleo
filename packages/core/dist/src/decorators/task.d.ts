import { TaskOptions } from "../types/interfaces";
export interface TaskConfig extends TaskOptions {
    name?: string;
}
export declare function task(config?: TaskConfig): MethodDecorator;
