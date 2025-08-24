import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function AvatarProfile({ src }: { src: string }) {
    return (
        <Avatar>
            <AvatarImage src={src} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
