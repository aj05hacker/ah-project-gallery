import React, { useState, useEffect, useRef } from 'react';
import { Bot } from 'lucide-react';
import { cn } from '@/lib/utils';
import './FloatingRobot.css';
import EnhancedChatUI from './EnhancedChatUI';
import ChatBubble from './ChatBubble';
import './ChatBubble.css';

interface FloatingRobotProps {
  className?: string;
}

const FloatingRobotUpdated: React.FC<FloatingRobotProps> = ({ className }) => {
  const [currentState, setCurrentState] = useState<'happy' | 'waiting' | 'active'>('happy');
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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
    setCurrentState('active');
  };

  useEffect(() => {
    const preloadVideos = async () => {
      try {
        const promises = Object.values(videos).map((src) => {
          return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.src = src;
            video.onloadeddata = resolve;
            video.onerror = reject;
            video.load();
          });
        });

        await Promise.all(promises);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading videos:', error);
        setHasError(true);
      }
    };

    preloadVideos();
  }, []);

  const getCurrentVideo = () => {
    switch (currentState) {
      case 'happy':
        return happyVideoRef;
      case 'waiting':
        return waitingVideoRef;
      case 'active':
        return activeVideoRef;
      default:
        return happyVideoRef;
    }
  };

  const currentVideoRef = getCurrentVideo();

  useEffect(() => {
    if (currentVideoRef.current && isLoaded && !hasError) {
      currentVideoRef.current.currentTime = 0;
      currentVideoRef.current.play().catch(() => {
        setHasError(true);
      });
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
      >
        <ChatBubble isOpen={isChatOpen} />
        <div className="relative">
          <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transition-all duration-300">
            {hasError || !isLoaded ? (
              <div className="w-full h-full flex items-center justify-center shimmer rounded-full">
                <Bot className="w-8 h-8 text-white" />
              </div>
            ) : (
              <div className="w-full h-full rounded-full overflow-hidden relative">
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
                />
                {(currentState === 'active' || isChatOpen) && <div className="pulse-ring"></div>}
              </div>
            )}
          </div>
        </div>
      </div>
      <EnhancedChatUI isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
};

export default FloatingRobotUpdated;
