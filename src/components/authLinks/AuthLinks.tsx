import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleQuestion,
    faEarthAsia,
    faKeyboard,
    faCoins,
    faGear,
    faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import { signOut, useSession } from 'next-auth/react'

import { AvatarProfile } from '../avatar/Avatar'
import Button from '../button/Button'
import Menu from '../popup/menu/Menu'

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

const userMenu = [
    {
        icon: <AvatarProfile src="" />,
        title: 'Thanh Huy',
        to: '/@thanh-huy',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
        separate: true,
    },
]

export default function AuthLinks(params: any) {
    const { status, data } = useSession()

    // Handle logic
    const handleMenuChange = async (menuItem: any) => {
        switch (menuItem.type) {
            case 'language':
                // Handle change language
                break
            default:
        }
        if (menuItem.title == 'Log out') {
            try {
                await signOut({ redirect: false, callbackUrl: '/' })
            } catch (error) {
                console.log(error)
            }
        }
    }
    return status === 'authenticated' ? (
        <Menu
            items={status === 'authenticated' ? userMenu : MENU_ITEMS}
            onChange={handleMenuChange}
        >
            <div>
                <Button className="flex items-center">
                    <AvatarProfile src={data.user?.image!} />
                </Button>
            </div>
        </Menu>
    ) : (
        <Button
            href="/login"
            className="text-white font-bold bg-red-500 py-1 px-3 rounded hover:bg-red-600"
        >
            Login
        </Button>
    )
}
