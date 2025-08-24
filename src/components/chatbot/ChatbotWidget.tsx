'use client'

import { useState } from 'react'
import { BsChatDots } from 'react-icons/bs'

type ChatMessage = {
    role: 'user' | 'assistant'
    content: string
}

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [input, setInput] = useState('')

    const toggleChat = () => setIsOpen(!isOpen)

    const sendMessage = async () => {
        if (!input.trim()) return

        const newMessages: ChatMessage[] = [
            ...messages,
            { role: 'user', content: input },
        ]
        setMessages(newMessages)
        setInput('')

        try {
            const res = await fetch('/api/chatbot', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input }),
            })

            if (!res.ok) {
                throw new Error('Lỗi kết nối đến AI')
            }

            type AssistantReply = {
                role: 'assistant'
                content: string
                reasoning?: any
                refusal?: any
            }

            const data: { reply: AssistantReply } = await res.json()

            setMessages([
                ...newMessages,
                { role: 'assistant', content: data.reply.content },
            ])
        } catch (error) {
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: '❌ Lỗi khi nhận phản hồi từ AI.',
                },
            ])
        }
    }

    return (
        <>
            {/* Nút mở chat */}
            <button
                onClick={toggleChat}
                className="fixed bottom-5 right-5 bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-blue-700 z-50"
            >
                <BsChatDots size={24} />
            </button>

            {/* Chat box */}
            {isOpen && (
                <div className="fixed bottom-24 right-5 w-80 h-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50">
                    <div className="p-3 border-b font-semibold bg-gray-100 text-gray-800 rounded-t-xl">
                        💬 AI Tư Vấn
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm text-gray-800">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`text-left ${
                                    msg.role === 'user'
                                        ? 'text-blue-600 text-right'
                                        : 'text-gray-700'
                                }`}
                            >
                                <strong>
                                    {msg.role === 'user' ? 'Bạn' : 'AI'}:
                                </strong>{' '}
                                {msg.content}
                            </div>
                        ))}
                    </div>

                    <div className="p-3 border-t bg-white">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && sendMessage()
                            }
                            placeholder="Nhập tin nhắn..."
                            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>
            )}
        </>
    )
}
