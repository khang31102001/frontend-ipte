export default function Home() {
    return (
        <div className="flex flex-col  items-center justify-center mb-4 gap-20">
            <div>
                <h1 className="text-2xl font-bold">Figma  demo 1 Home Page</h1>
                <p className="text-gray-600 mb-10">An example of embedding a Figma prototype in a Next.js app</p>
                <iframe
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                    width={800}
                    height={450}
                    src="https://embed.figma.com/proto/J0P6FzueUgONICpMUdb0hG/demo-design-PTE?node-id=1-4&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                    allow="clipboard-write"
                    allowFullScreen
                />
            </div>
            <div>
                <h1 className="text-2xl font-bold">Figma demo 2 Home Page</h1>
                <p className="text-gray-600 mb-10">An example of embedding a Figma prototype in a Next.js app</p>
                <iframe
                    style={{ border: "1px solid rgba(0,0,0,0.1)" }}
                    width={800}
                    height={450}
                    src="https://embed.figma.com/proto/J0P6FzueUgONICpMUdb0hG/demo-design-PTE?node-id=9-2&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&embed-host=share"
                    allow="clipboard-write"
                    allowFullScreen

                />

            </div>

        </div>
    );
}
