export interface ICommentsSectionProps {
    selectedSection: Data;
    newComment: string;
    setNewComment: React.Dispatch<React.SetStateAction<string>>;
    handleAddComment: () => void;
  }