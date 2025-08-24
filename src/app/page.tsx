'use client'

import Body from '@/components/body/Body'

import ChatbotWidget from '@/components/chatbot/ChatbotWidget'
import HomePages from '@/pages/home-pages'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
// Turn off load css file when refresh
config.autoAddCss = false

export default function Home() {
    return (
        <div>
            <HomePages />
        </div>
    )
}
