import { useState } from "react";
import { MessageCircle, X } from "lucide-react";


const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Sliding Contact Panel */}
      <div
        className={`absolute bottom-16 right-0 bg-card border-2 border-border rounded-2xl shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-8 scale-0 pointer-events-none"
        }`}
        style={{ width: "280px" }}
      >
        <div className="p-6">
          <h3 className="text-lg font-bold mb-4 text-foreground">
            Liên hệ với chúng tôi
          </h3>

          <div className="space-y-3">
            {/* Zalo Contact */}
            <a
              href="https://zalo.me/YOUR_ZALO_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#0068FF] hover:bg-[#0052CC] text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 48 48"
                  className="w-6 h-6"
                  fill="#0068FF"
                >
                  <path d="M24 4C12.954 4 4 11.79 4 21.5c0 5.934 3.456 11.234 8.727 14.478-.167 2.124-.867 7.042-.997 7.996-.168 1.232.445 1.213.936.884.394-.263 6.338-4.154 8.862-5.807C22.308 39.49 23.136 39.5 24 39.5c11.046 0 20-7.79 20-17.5S35.046 4 24 4z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Chat qua Zalo</div>
                <div className="text-xs text-white/80">Phản hồi nhanh</div>
              </div>
            </a>

            {/* Facebook Contact */}
            <a
              href="https://m.me/YOUR_FACEBOOK_PAGE"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-[#0084FF] hover:bg-[#0073E6] text-white transition-colors group"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <svg
                  viewBox="0 0 48 48"
                  className="w-6 h-6"
                  fill="#0084FF"
                >
                  <path d="M24 4C12.972 4 4 12.972 4 24s8.972 20 20 20 20-8.972 20-20S35.028 4 24 4zm0 3.6c9.04 0 16.4 7.36 16.4 16.4 0 8.171-5.983 14.937-13.8 16.187V29.333h3.787l.72-4.72H26.6v-3.067c0-1.585.777-3.133 3.268-3.133h2.059v-4.013s-1.867-.32-3.654-.32c-3.73 0-6.167 2.26-6.167 6.347v3.593h-4.147v4.72h4.147v10.854C11.383 38.937 7.6 32.171 7.6 24c0-9.04 7.36-16.4 16.4-16.4z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="font-semibold">Chat Facebook</div>
                <div className="text-xs text-white/80">Messenger</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110 flex items-center justify-center animate-pulse"
        aria-label="Chat with us"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingChat;
