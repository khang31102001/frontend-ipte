import Button from '@/components/button/Button'
import React from 'react'

interface MenuItemProps {
    data: any
    className: string
    isAccount: boolean
    onClick: () => void
}

const MenuItem: React.FC<MenuItemProps> = ({
    data,
    className,
    isAccount,
    onClick,
}) => {
    return (
        <Button
            href={data.to}
            className={`${className} p-2 w-full text-left flex items-center hover:bg-slate-100 hover:text-red-400 dark:hover:bg-slate-800`}
            isAccount={isAccount}
            leftIcon={data.icon}
            onClick={onClick}
        >
            {data.title}
        </Button>
    )
}

export default MenuItem
