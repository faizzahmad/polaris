"use client"
import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { UserButton } from "@clerk/nextjs";
import { useProject, useRenameProjects } from "../hooks/use-projects";
import { useState } from "react";
import { TooltipTrigger,TooltipContent,Tooltip ,TooltipProvider} from "@/components/ui/tooltip";
import { CloudCheckIcon, LoaderIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
const font = Poppins({
    subsets : ["latin"],
    weight : ["400","500","600","700"]
})
const Navbar = (
    {projectId} : {projectId: Id<"projects">}
) => {
    const project = useProject(projectId);
    const renameProject = useRenameProjects(projectId);
    const [isRenaming, setIsRenaming] = useState(false);
    const [name,setName] = useState("");
    const handelStartRename = () => {
        if(!project) return;
        setName(project.name);
        setIsRenaming(true);
    }

    const handelSubmit = () => {
        if(!project) return;
        setIsRenaming(false);
        const trimmedName = name.trim();
        if(!trimmedName || trimmedName === project?.name)return;
        renameProject({id : projectId, name : trimmedName});
    };

    const handelKeyDown = (e : React.KeyboardEvent) => {
       if(e.key === "Enter"){
        handelSubmit();
       }else if(e.key === "Escape"){
        setIsRenaming(false)
       }
    }

    return ( 
        <nav className="flex items-center justify-between gap-x-2 p-2 bg-sidebar border-b">
            <div className="flex items-center gap-x-2">
            <Breadcrumb className="gap-0!">
            <BreadcrumbList>
              <BreadcrumbItem>
            <BreadcrumbLink className="flex items-center gap-1.5" asChild>
             <Button
             variant={'ghost'}
             className="w-fit! p-1.5! h-7!"
             asChild
             >
                <Link href={'/'}>
                <Image
                src="/logo.svg"
                alt="Polaris Logo"
                width={20}
                height={20}
                />
                <span className={cn("text-sm font-medium",font.className)}>
                    Polaris
                </span>
                </Link>
                </Button>
            </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="ml-0! mr-1" />
            <BreadcrumbItem>
            {
                isRenaming ? (<input
                type="text"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                }}
                onFocus={(e) => {
                    e.currentTarget.select()
                }}
                onBlur={handelSubmit}
                onKeyDown={handelKeyDown}
                className="text-sm bg-transparent text-foreground outline-none focus:ring-1 focus:ring-inset focus:ring-ring font-medium max-w-40 truncate"
                />) : (
                    <BreadcrumbPage
                    onClick={handelStartRename}
            className="text-sm cursor-pointer hover:text-primary font-medium max-w-40 truncate"
            >
           {project?.name ?? "Loading.."}
            </BreadcrumbPage>
                )
            }
            
            </BreadcrumbItem>
            </BreadcrumbList>
          
            </Breadcrumb>
            {
                project?.importStatus === "importing" ? (<TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                    <LoaderIcon className="size-4 text-muted-foreground animate-spin"/>
                    </TooltipTrigger>
                    <TooltipContent>
                        Importing...
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>) : (
                        <TooltipProvider>
                          <Tooltip>
                    <TooltipTrigger asChild>
                    <CloudCheckIcon className="size-4 text-muted-foreground "/>
                    </TooltipTrigger>
                    <TooltipContent>
                       Saved {" "}
                       {project?.updatedAt ? (
                        formatDistanceToNow(
                        project.updatedAt,
                        {addSuffix : true}
                       )
                       ) : "Loading..."}
                    </TooltipContent>
                </Tooltip>
                      </TooltipProvider>
                )
            }
            </div>
            <div className="flex items-center gap-2">
             <UserButton/>
            </div>
        </nav>
     );
}
 
export default Navbar;