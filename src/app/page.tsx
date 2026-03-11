"use client";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
const Page = () => {
  const project = useQuery(api.project.get);
  const createProject = useMutation(api.project.create);
  return ( 
    <div className=" flex flex-wrap gap-4 items-center">
      <Button onClick={() => createProject({
        name : "New project"
      })}>
        Add new
      </Button>
      {
        project?.map((project) => (
          <div key={project._id} className=" border p-4 rounded">
            {project.name}
            <br />
            ownerId : {project.ownerId}
          </div>
        ))
      }
    </div>
  );
}
 
export default Page;