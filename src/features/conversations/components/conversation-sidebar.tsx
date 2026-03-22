import { Id } from "../../../../convex/_generated/dataModel";

interface ConversationSidebarProps {
  projectId: Id<"projects">;
};

export const ConversationSidebar = ({projectId}: ConversationSidebarProps) => {
    return (
        <div>
            <div>
                <h1>Conversations</h1>
            </div>
        </div>
    )
}