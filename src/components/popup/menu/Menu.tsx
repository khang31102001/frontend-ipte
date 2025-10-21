'use client'

import Tippy from '@tippyjs/react/headless'
import { useState } from 'react'

import PopperWrapper from '../PopperWrapper'
import MenuItem from './MenuItem'
import Header from './Header'

const defaultFn = () => {}

export default function Menu({ children, items = [], className, onChange = defaultFn }: any) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item: any, index: number) => {
            const isParent = !!item.children

            let classes = ''
            let isAccount = false
            if (item.icon && !item.icon.props.icon) {
                classes =
                    'border border-solid font-bold dark:border-slate-800/100'
                isAccount = true
            }
            return (
                <MenuItem
                    key={index}
                    data={item}
                    className={classes}
                    isAccount={isAccount}
                    onClick={() => {
                        if (isParent) {
                            setHistory((prev) => [...prev, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    return (
        <Tippy
            arrow={true}
            interactive
            // visible={true}
            delay={[0, 600]}
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div
                    className={`border border-solid rounded mt-1 dark:border dark:border-slate-800/100 ${className} `}
                    tabIndex={-1}
                    {...attrs}
                >
                    <PopperWrapper className="z-50 w-full shadow-md dark:shadow-slate-800/100">
                        {history.length > 1 && (
                            <Header
                                title="Language"
                                onBack={() => {
                                    setHistory((prev) =>
                                        prev.slice(0, prev.length - 1),
                                    )
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}
