import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import './FloatingRobot.css';
const ChatUI = React.lazy(() => import('./ChatUI'));
const ChatBubble = React.lazy(() => import('./ChatBubble'));
import './ChatBubble.css';

interface FloatingRobotProps {
  className?: string;
}

const FloatingRobot: React.FC<FloatingRobotProps> = ({ className }) => {
  const [currentState, setCurrentState] = useState<'happy' | 'waiting' | 'active'>('happy');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // In-memory video cache
  const videoCache = useRef<{ [key: string]: HTMLVideoElement | null }>({ happy: null, waiting: null, active: null });

  const happyVideoRef = useRef<HTMLVideoElement>(null);
  const waitingVideoRef = useRef<HTMLVideoElement>(null);
  const activeVideoRef = useRef<HTMLVideoElement>(null);

  const videos = {
    happy: '/robot-happy.mp4',
    waiting: '/robot-waiting.mp4',
    active: '/robot-active.mp4',
  };

  useEffect(() => {
    if (currentState === 'active') return;
    intervalRef.current && clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentState((prev) => (prev === 'happy' ? 'waiting' : 'happy'));
    }, 15000);
    return () => {
      intervalRef.current && clearInterval(intervalRef.current);
    };
  }, [currentState]);

  const handleMouseEnter = () => {
    if (currentState !== 'active') {
      intervalRef.current && clearInterval(intervalRef.current);
      setCurrentState('active');
    }
  };

  const handleMouseLeave = () => {
    if (!isChatOpen) {
      setCurrentState('happy');
    }
  };

  const handleRobotClick = () => {
    setIsChatOpen((prev) => !prev);
    if (!isChatOpen) {
      setCurrentState('active');
    }
  };

  useEffect(() => {
    // Only preload and cache if not already cached
    const preloadVideos = async () => {
      try {
        const keys = Object.keys(videos);
        const promises = keys.map((key) => {
          return new Promise((resolve) => {
            if (videoCache.current[key]) return resolve(true);
            const video = document.createElement('video');
            video.src = videos[key as keyof typeof videos];
            video.onloadeddata = () => {
              videoCache.current[key] = video;
              resolve(true);
            };
            video.onerror = () => {
              // Suppress error logging for asset load
              videoCache.current[key] = null;
              resolve(false);
            };
            video.load();
          });
        });
        await Promise.all(promises);
        setIsLoaded(true);
      } catch {
        // Do not log any error
        setHasError(true);
      }
    };
    preloadVideos();
    // No dependency on videos: only run once
    // eslint-disable-next-line
  }, []);


  // Play the correct cached video on state change
  useEffect(() => {
    if (!isLoaded || hasError) return;
    const key = currentState;
    const cached = videoCache.current[key];
    if (cached) {
      try {
        cached.currentTime = 0;
        cached.play().catch(() => {});
      } catch {}
    }
  }, [currentState, isLoaded, hasError]);

  return (
    <>
      <div
        className={cn('fixed bottom-6 right-6 z-50 floating-robot-container', className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleRobotClick}
        style={{ cursor: 'pointer' }}
        role="button"
        tabIndex={0}
        aria-label="Open or close chat assistant"
      >
        <Suspense fallback={null}>
          <ChatBubble isOpen={isChatOpen} />
        </Suspense>
        <div className="relative">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-300">
            {hasError || !isLoaded ? (
              <div className="w-full h-full flex items-center justify-center shimmer rounded-full">
                <Bot className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full overflow-hidden relative">
                {/* Use cached video elements if available, else fallback to normal video tags */}
                <video
                  ref={happyVideoRef}
                  src={videos.happy}
                  className={cn(
                    'absolute inset-0 w-full h-full object-cover video-transition',
                    currentState === 'happy' ? 'opacity-100' : 'opacity-0'
                  )}
                  muted
                  loop
                  playsInline
                  onError={e => { e.preventDefault(); }}
                />
                <video
                  ref={waitingVideoRef}
                  src={videos.waiting}
                  className={cn(
                    'absolute inset-0 w-full h-full object-cover video-transition',
                    currentState === 'waiting' ? 'opacity-100' : 'opacity-0'
                  )}
                  muted
                  loop
                  playsInline
                  onError={e => { e.preventDefault(); }}
                />
                <video
                  ref={activeVideoRef}
                  src={videos.active}
                  className={cn(
                    'absolute inset-0 w-full h-full object-cover video-transition',
                    currentState === 'active' ? 'opacity-100' : 'opacity-0'
                  )}
                  muted
                  loop
                  playsInline
                  onError={e => { e.preventDefault(); }}
                />
                {(currentState === 'active' || isChatOpen) && <div className="pulse-ring"></div>}
              </div>
            )}
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <ChatUI 
          isOpen={isChatOpen} 
          onClose={() => {
            setIsChatOpen(false);
            setCurrentState('happy');
          }} 
        />
      </Suspense>
    </>
  );
};

export default FloatingRobot;
