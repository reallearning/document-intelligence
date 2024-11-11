import { Data, Comment } from "@/types/annotations";
import { Button } from "../button";
import { formatTimestamp } from "@/lib/utils";
import { ICommentsSectionProps } from "./types";

export const CommentsSection = ({
  selectedSection,
  newComment,
  setNewComment,
  handleAddComment,
}: ICommentsSectionProps) => {
  return (
    <div className="w-[300px] bg-[#BAAE921A] pt-28 font-nunito leading-[18px] font-normal">
      <div className="border-t border-[#8C8C8C] opacity-50 mx-2 pb-3" />
      <p className="font-nunito font-normal text-xs leading-[18px] text-morrie-text px-3 mb-2">
        Comments
      </p>
      <div className="ml-2 mr-3">
        {selectedSection.comments?.map((comment: Comment) => (
          <div key={comment.id} className="bg-white rounded-xl p-3 mb-2">
            <div className="flex items-center gap-x-2">
              <div className="h-5 w-5 bg-[#D9D9D9] rounded-full text-black flex items-center justify-center text-xs font-nunito">
                {comment.senderMail.charAt(0).toUpperCase()}
              </div>
              <p className="text-sm text-[#8C8C8C]">{comment.senderMail}</p>
            </div>
            <p className="text-xs text-black mt-3">{comment.message}</p>
            <div className="flex justify-end items-center">
              <p className="text-[10px] text-[#9C9C9C]">
                {formatTimestamp(
                  new Date(`${comment.date} ${comment.time}`).getTime()
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col rounded-xl bg-white p-3 ml-2 mr-3">
        <p className="text-xs text-[#9C9C9C] mb-2">You</p>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="border-b border-[#8C8C8C] opacity-50 p-2 text-xs focus:outline-none text-black mb-4"
        />

        <div className="flex justify-end">
          <Button
            disabled={newComment.length <= 3}
            color="primary-default"
            size="xs"
            className="px-5 rounded-md text-sm"
            onClick={handleAddComment}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
