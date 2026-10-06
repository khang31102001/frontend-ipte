"use client";
import { useState, useEffect, useRef } from 'react';
import { X, HelpCircle, ChevronsUpIcon } from 'lucide-react';
import Image from 'next/image';
import clsx from 'clsx';

interface Action {
  id: string;
  type: 'chat' | 'call' | 'book' | 'zalo' | string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode | string;
  priority: number;
}

interface FloatingContactWidgetProps {
  unreadCount?: number;
  actions?: Action[];
  defaultOpen?: boolean;
  onEvent?: (eventName: string, metadata: Record<string, unknown>) => void;
}

export default function FloatingContact({
  unreadCount = 0,
  actions = [],
  defaultOpen = false,
  onEvent,
}: FloatingContactWidgetProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const sortedActions = [...actions].sort((a, b) => a.priority - b.priority);

  const emitEvent = (eventName: string, metadata: Record<string, unknown> = {}) => {
    if (onEvent) {
      onEvent(eventName, {
        ...metadata,
        page: window.location.pathname,
        timestamp: new Date().toISOString(),
        deviceType: window.innerWidth < 768 ? 'mobile' : 'desktop',
      });
    }
  };

  const toggleOpen = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (newState) {
      emitEvent('floating_widget_open');
    }
  };

  const handleActionClick = (action: Action) => {
    emitEvent(`click_${action.type}`);
    if (action.onClick) {
      action.onClick();
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-24 right-[24px] z-50 flex flex-col items-center gap-3"
      style={{
        ['--brand-yellow' as string]: '#F6C445',
        ['--brand-yellow-hover' as string]: '#EFB62A',
        ['--brand-halo' as string]: '#FFF4D6',
        ['--text-dark' as string]: '#1F2937',
      }}
    >
      {isOpen && (
        <div className="flex flex-col gap-2 mb-2">
          {sortedActions.map((action, index) => (
            <div
              key={action.id}
              className="relative group animate-slide-up-fade "
              style={{
                animationDelay: `${index * 0.07}s`,
              }}
              onMouseEnter={() => setShowTooltip(action.id)}
              onMouseLeave={() => setShowTooltip(null)}
            >
              <a
                href={action.href}
                onClick={(e) => {
                  if (action.onClick) {
                    e.preventDefault();
                  }
                  handleActionClick(action);
                }}
                aria-label={action.label}
                className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 border-2 border-[var(--brand-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-halo)] focus:ring-offset-2 "
              >

                {typeof action.icon === 'string' ? (
                  <Image src={action.icon} alt={action.label} width={20} height={20} className="w-5 h-5" />
                ) : (
                  <span className="text-[var(--text-dark)]">{action.icon}</span>
                )}
              </a>

              {showTooltip === action.id && (
                <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[var(--text-dark)] text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
                  {action.label}
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-8 border-l-[var(--text-dark)] border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={clsx(
          "flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white rounded-full shadow-lg",
          "border-2 border-[var(--brand-yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-halo)] focus:ring-offset-2",
          "transition-all duration-300 will-change-transform",
          showScrollTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none",
          showScrollTop && "hover:shadow-xl hover:-translate-y-0.5"
        )}
      >
        <ChevronsUpIcon className="w-5 h-5 text-[var(--text-dark)]" />
      </button>

      <button
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
        aria-expanded={isOpen}
        className="relative flex items-center justify-center 
        w-14 h-14 md:w-16 md:h-16 bg-[var(--brand-yellow)] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 
        hover:-translate-y-0.5 hover:bg-[var(--brand-yellow-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-halo)] focus:ring-offset-2  "
        style={{
          boxShadow: '0 0 0 0 rgba(246, 196, 69, 0.4)',
          animation: 'pulse 2s infinite',
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-dark)]" />
        ) : (
          <HelpCircle className="w-6 h-6 md:w-7 md:h-7 text-[var(--text-dark)]" />
        )}

        {!isOpen && unreadCount > 0 && (
          <div
            className="absolute -top-1 -right-1 min-w-[24px] h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-md animate-bounce"

          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </div>
        )}
      </button>



      <style>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(246, 196, 69, 0.4);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(246, 196, 69, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(246, 196, 69, 0);
          }
        }
      `}</style>
    </div>
  );
}
