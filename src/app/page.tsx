export default function Home() {
    return (
        <div className="min-h-dvh flex flex-col items-center justify-center gap-16 px-4 py-10">
            {/* Block 1 */}
            <section className="w-full max-w-5xl">
                <h1 className="text-3xl md:text-4xl font-bold">Figma demo 1 – Home</h1>
                <p className="text-gray-600 mb-6 md:mb-8">
                    An example of embedding a Figma prototype in a Next.js app
                </p>

                {/* Responsive iframe */}
                <div className="w-full rounded-xl shadow-sm ring-1 ring-black/10 overflow-hidden">
                    <div className="aspect-video"> {/* 16:9 responsive box */}
                        <iframe
                            className="w-full h-full"
                            src="https://embed.figma.com/proto/J0P6FzueUgONICpMUdb0hG/demo-design-PTE?node-id=1-4&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                            allow="clipboard-write"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Block 2 */}
            <section className="w-full max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold">Figma demo 2 – Home</h2>
                <p className="text-gray-600 mb-6 md:mb-8">
                    An example of embedding a Figma prototype in a Next.js app
                </p>

                <div className="w-full rounded-xl shadow-sm ring-1 ring-black/10 overflow-hidden">
                    <div className="aspect-video">
                        <iframe
                            className="w-full h-full"
                            src="https://embed.figma.com/proto/J0P6FzueUgONICpMUdb0hG/demo-design-PTE?node-id=9-2&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                            allow="clipboard-write"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
