'use client'
import { useState } from 'react'
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CommentFormData } from '@/types/comment'

interface CommentFormProps {
    onSubmit: (data: CommentFormData) => void
    isReply?: boolean
    parentUserName?: string
    currentUserName?: string
    currentUserAvatar?: string
    placeholder?: string
}

export function CommentForm({
    onSubmit,
    isReply = false,
    parentUserName,
    currentUserName = 'Guest User',
    currentUserAvatar,
    placeholder,
}: CommentFormProps) {
    const [content, setContent] = useState('')
    const [rating, setRating] = useState<number | undefined>(undefined)
    const [hoveredStar, setHoveredStar] = useState<number | undefined>(
        undefined,
    )

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        onSubmit({
            content: content.trim(),
            rating: !isReply ? rating : undefined,
        })

        setContent('')
        setRating(undefined)
    }

    const defaultPlaceholder = isReply
        ? `Reply to ${parentUserName}...`
        : 'Share your thoughts about this course...'

    return (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="flex items-start space-x-3">
                <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage
                        src={currentUserAvatar}
                        alt={currentUserName}
                    />
                    <AvatarFallback>{currentUserName.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder={placeholder || defaultPlaceholder}
                        rows={isReply ? 2 : 4}
                        className="
                        block w-full rounded resize-none 
                        border border-input bg-background
                        pad-sm text-sm leading-6
                        placeholder:text-muted-foreground
                        focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 focus:ring-offset-background "
                    />

                    {!isReply && (
                        <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                                Rate this course:
                            </span>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() =>
                                            setHoveredStar(star)
                                        }
                                        onMouseLeave={() =>
                                            setHoveredStar(undefined)
                                        }
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={cn(
                                                'w-5 h-5',
                                                (
                                                    hoveredStar !== undefined
                                                        ? star <= hoveredStar
                                                        : star <= (rating || 0)
                                                )
                                                    ? 'fill-yellow-300 text-yellow'
                                                    : 'text-muted-foreground',
                                            )}
                                        />
                                    </button>
                                ))}
                            </div>
                            {rating && (
                                <button
                                    type="button"
                                    onClick={() => setRating(undefined)}
                                    className="text-xs text-muted-foreground hover:text-foreground ml-2"
                                >
                                    Clear
                                </button>
                            )}
                        </div>
                    )}

                    <div className="flex justify-end">
                        <button
                            className="btn-link btn-sm bg-hero-gradient text-white rounded transition-all duration-200 ease-in-out"
                            type="submit"
                            disabled={!content.trim()}
                            //   size={isReply ? "sm" : "default"}
                        >
                            {isReply ? 'Reply' : 'Post Comment'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}
