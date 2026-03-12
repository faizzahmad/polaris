import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useProjects = () => {
 return useQuery(api.project.get);
};

export const useProjectsPartials = (limit : number) => {
 return useQuery(api.project.getPartial,{limit});
};

export const useCreateprojects = () => {
    return useMutation(api.project.create).withOptimisticUpdate(
        (localStore,args) => {
            const existingProjects = localStore.getQuery(api.project.get);
            if(existingProjects !== undefined) {
                const now = Date.now();
                const newProject = {
                    _id : crypto.randomUUID() as Id<"projects">,
                    _creationTime : now,
                    name : args.name,
                    ownerId : "anonymus",
                    updatedAt : now,
                };
                localStore.setQuery(api.project.get,{},[
                    newProject,
                    ...existingProjects,
                ]);
            }
        }
    )
};