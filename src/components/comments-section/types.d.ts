import { Comment } from "@/types/annotations";

export interface ICommentsSectionProps {
  label: string;
  value: string;
  comments: Comment[];
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: () => void;
  closeComments: () => void;
}
