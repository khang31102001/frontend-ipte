"use client"
import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageSquare, Flag, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Comment } from "@/types/comment";
import clsx from "clsx";
import { CommentForm } from "./comment-form";


interface CommentItemProps {
  comment: Comment;
  onReply: (parentId: string, content: string, rating?: number) => void;
  onLike: (commentId: string) => void;
  onReport?: (commentId: string) => void;
  currentUserName?: string;
  currentUserAvatar?: string;
  depth?: number;
}

export function CommentItem({
  comment,
  onReply,
  onLike,
  onReport,
  currentUserName,
  currentUserAvatar,
  depth = 0,
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleReply = (data: { content: string; rating?: number }) => {
    onReply(comment.id ??"", data.content, data.rating);
    setShowReplyForm(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(comment.id ?? "");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined 
    });
  };

  return (
    <div className={cn("space-y-4", depth > 0 && "ml-12")}>
      <div className="flex items-start space-x-3">
        <Avatar className="w-10 h-10 flex-shrink-0">
          <AvatarImage src={comment.userAvatar} alt={comment.userName} />
          <AvatarFallback>{comment?.userName?.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-sm">{comment.userName}</h4>
                <p className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</p>
              </div>
              
              {comment.rating && (
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-4 h-4",
                        i < comment.rating! ? "fill-accent text-accent" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
              )}
            </div>

            <p className="text-sm leading-relaxed whitespace-pre-wrap">{comment.content}</p>
          </div>

          {/* <div className="flex items-center space-x-4 mt-2 ml-2">
            <button
            
              onClick={handleLike}
              className={clsx(
                "h-8 px-2 text-xs",
                isLiked && "text-primary"
              )}
            >
              <ThumbsUp className={cn("w-4 h-4 mr-1", isLiked && "fill-current")} />
              {comment.likes + (isLiked ? 1 : 0)}
            </button>

            {depth === 0 && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="h-8 px-2 text-xs"
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Reply
              </button>
            )}

            <button
              onClick={() => onReport(comment.id)}
              className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div> */}
        </div>
      </div>

      {showReplyForm && (
        <div className="ml-12">
          <CommentForm
            onSubmit={handleReply}
            isReply
            parentUserName={comment.userName}
            currentUserName={currentUserName}
            currentUserAvatar={currentUserAvatar}
          />
        </div>
      )}

      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-4">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onReport={onReport}
              currentUserName={currentUserName}
              currentUserAvatar={currentUserAvatar}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
