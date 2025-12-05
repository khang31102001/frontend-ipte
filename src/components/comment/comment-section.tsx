"use client"
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Star } from "lucide-react";
import { Comment } from "@/types/comment";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";
// import { toast } from "sonner";

interface CommentsSectionProps {
  courseId:  number;
  totalComments?: number;
  averageRating?: number;
}

// Mock data - replace with API
// const mockComments: Comment[] = [
//   {
//     id: 1,
//     courseId: 2,
//     userId: 1,
//     userName: "Sarah Chen",
//     userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
//     content: "This course completely transformed my PTE speaking score! The strategies are practical and the feedback from instructors is invaluable. I went from 65 to 82 in just 8 weeks. Highly recommended!",
//     rating: 5,
//     createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
//     likes: 24,
//     replies: [
//       {
//         id: 11,
      
//         userName: "Dr. Michael Zhang",
//         userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
//         content: "Thank you Sarah! We're thrilled to hear about your success. Your dedication and practice really paid off. Best of luck with your goals!",
//         createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
//         likes: 8,
//         parentId: "1",
//       },
//     ],
//   },
//   {
//     id: 2,
//     userName: "James Wilson",
//     userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
//     content: "Great course overall! The read aloud and repeat sentence modules are particularly strong. I would love to see more practice materials for describe image tasks though.",
//     rating: 4,
//     createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
//     likes: 12,
//   },
//   {
//     id: 3,

//     userName: "Priya Sharma",
//     userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
//     content: "The weekly mock tests are a game-changer! They helped me identify my weak areas and improve systematically. The AI pronunciation feedback is also very accurate.",
//     rating: 5,
//     createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
//     likes: 18,
//     replies: [
//       {
//         id: 3,
//         userName: "David Kim",
//         userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
//         content: "I agree! The mock tests really helped me build confidence before the actual exam.",
//         createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
//         likes: 5,
//         parentId: "3",
//       },
//     ],
//   },
//   {
//     id: 4,

//     userName: "Maria Rodriguez",
//     userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
//     content: "The course structure is well-organized and the instructors are very responsive. My only suggestion would be to add more example answers for each task type.",
//     rating: 4,
//     createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
//     likes: 9,
//   },
// ];

export function CommentsSection({ courseId, totalComments = 156, averageRating = 4.7 }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "helpful">("newest");

  const handleAddComment = (data: { content: string; rating?: number }) => {
    const newComment: Comment = {
      id: `temp-${Date.now()}`,
      courseId,
      userId: 1,
      userName: "You",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content: data.content,
      rating: data.rating,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([newComment, ...comments]);
    alert("Comment posted successfully!");
  };

  const handleReply = (parentId: string, content: string) => {
    const newReply: Comment = {
      courseId,
      userId: 1,
      userName: "You",
      userAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      parentId,
    };

    setComments((prev) =>
      prev.map((comment) => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      })
    );

    alert("Reply posted successfully!");
  };

  const handleLike = (commentId: string) => {
    // In real app, this would call an API
    console.log("Liked comment:", commentId);
  };



  const sortedComments = [...comments].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "helpful":
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  return (
    <section className="space-y-6">
      {/* Header Stats */}
      <div className="card-box rounded pad-sm">
        <div className="">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center text-2xl">
                <MessageSquare className="w-6 h-6 mr-2" />
                Bình luận học viên
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {totalComments} Đánh giá từ học viên
              </p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <Star className="w-6 h-6 fill-yellow-300 text-yellow-300" />
                <span className="text-3xl font-bold">{averageRating}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(averageRating)
                        ? "fill-yellow-300 text-yellow-300"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Comment Form */}
      <div className="card-box rounded overflow-hidden ">
        <div className="card-header">
          <h1 className="card-title ">Chia sẽ trãi nghiệm</h1>
        </div>
        <span className="p-6">
          <CommentForm onSubmit={handleAddComment} />
        </span>
      </div>

      {/* Comments List */}
      <div className="card-boxs">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <div className="text-lg">
              Tất cả bình luận ({comments.length})
            </div>
            
            <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)} >
              <SelectTrigger className="w-[140px]  transition-colors  duration-200 ease focus:ring-blue-800 ">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="card-content space-y-6">
          {sortedComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              onReply={handleReply}
              onLike={handleLike}
            
              currentUserName="You"
              currentUserAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
            />
          ))}

          {comments.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No reviews yet. Be the first to share your experience!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
