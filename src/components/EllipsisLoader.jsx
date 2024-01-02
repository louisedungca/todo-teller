import { useEffect } from 'react';
import { gsap } from 'gsap';

const EllipsisLoader = () => {
  useEffect(() => {
    const loadingTimeline = gsap.timeline({ 
      repeat: -1 
    });

    loadingTimeline.to('.loading-dot', { 
      scale: 1.5, 
      yoyo: true, 
      repeat: -1, 
      duration: 0.5,
      stagger: 0.2,
    });

    return () => loadingTimeline.kill();
  }, []);

  return (
    <div className='flex gap-1 p-2'>
      <div className='loading-dot w-1 aspect-square rounded-full bg-gray-500' />
      <div className='loading-dot w-1 aspect-square rounded-full bg-gray-500' />
      <div className='loading-dot w-1 aspect-square rounded-full bg-gray-500' />
    </div>
  );
};

export default EllipsisLoader;
