import Link from 'next/link'

export default function ArticleItem(params: any) {
    return (
        <div className="mt-3">
            <Link href={'/article'}>
                <h4 className="font-medium max-h-12 overflow-hidden overflow-ellipsis line-clamp-2">
                    JWT Authentication in NodeJS
                </h4>
                <div className="text-sm flex gap-2">
                    <div>Thanh Huy</div>
                    <span>·</span>
                    <div>69 reads</div>
                </div>
            </Link>
        </div>
    )
}
