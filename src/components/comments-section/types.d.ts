import { Comment } from "@/types/annotations";

export interface ICommentsSectionProps {
  comments: Comment[];
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: () => void;
}
