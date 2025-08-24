import Article from '../blog/article/Article'
import Aside from './aside/Aside'
import MainBody from './mainBody/MainBody'

// Call API GET articles: TODO
// Fake data articles.
const articles = [
    {
        id: '1',
        title: 'Create Instagram-like Long Press and Draggable Carousel Indicators in Jetpack Compose.',
        description:
            'We must have used this UX in the Instagram mobile app, where we can long press the the the',
    },
    {
        id: '2',
        title: 'How To Make Your Node.js API 5x Faster With Platformatic.',
        description:
            'As a backend developer, building robust, secure and fast APIs is critical to success. Fast APIs lead to better user experienc',
    },
    {
        id: '3',
        title: 'Connect your LLM to the world with the Ollama functions.',
        description:
            'Ollama functions are similar to the OpenAI functions. Thanks to this feature, the model can understand (from a prompt) that',
    },
]

export default function Body() {
    return (
        <main className="container max-w-5xl flex justify-between gap-4">
            <MainBody>
                {articles.map((article) => (
                    <Article key={article.id} article={article} />
                ))}
            </MainBody>
            <Aside />
        </main>
    )
}
