import Link, { LinkProps } from 'next/link'
import React, { ReactNode } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    href?: string
    disabled?: boolean
    children?: ReactNode
    className?: string
    leftIcon?: ReactNode
    rightIcon?: ReactNode
    isAccount?: boolean
    onClick?: () => void
}

function Button({
    href,
    disabled,
    children,
    className,
    leftIcon,
    rightIcon,
    isAccount,
    onClick,
    ...passProps
}: ButtonProps) {
    let Comp: React.ElementType = 'button'
    const props = {
        onClick,
        ...passProps,
    } as any

    // Remove event listener when btn is disabled
    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on')) {
                delete props[key]
            }
        })
    }

    if (href) {
        props.href = href
        Comp = Link
    }

    const classes =
        `${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`.trim()

    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className="inline-block mr-2">{leftIcon}</span>}
            <span className={`${isAccount && ''}`}>{children}</span>
            {rightIcon && (
                <span className="inline-block w-6 text-center">
                    {rightIcon}
                </span>
            )}
        </Comp>
    )
}

export default Button
