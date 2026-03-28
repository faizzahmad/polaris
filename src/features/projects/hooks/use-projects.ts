import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export const useProject = (projectId : Id<"projects">) => {
 return useQuery(api.project.getById,{id : projectId});
};

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

export const useRenameProjects = () => {
    return useMutation(api.project.rename).withOptimisticUpdate(
        (localStore,args) => {
            const existingProject = localStore.getQuery(api.project.getById,{id : args.id});
            if(existingProject !== undefined && existingProject.name !== null) {
                 localStore.setQuery(api.project.getById,{id : args.id},{
                     ...existingProject,
                     name : args.name,
                     updatedAt : Date.now(),
                 })
            }

              const existingProjects = localStore.getQuery(api.project.get);
              if(existingProjects !== undefined) {
                  localStore.setQuery(
                    api.project.get,
                    {},
                    existingProjects.map((project) => {
                        return project._id === args.id
                        ? {...project,name : args.name,updatedAt : Date.now()} : project
                    })
                  );
              }
        }
    )
};

export const useUpdateProjectSettings = () => {
    return useMutation(api.project.updateSettings);
  };
  