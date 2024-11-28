import { useState, useEffect } from 'react';

const useGlobalHideScrollbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
        document.querySelectorAll('.scrollable').forEach((el) => {
          el.classList.remove('hidden-scrollbar');
        });
      }

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        setIsScrolling(false);
        document.querySelectorAll('.scrollable').forEach((el) => {
          el.classList.add('hidden-scrollbar');
        });
      }, 1000);
    };

    const scrollElements = document.querySelectorAll('.scrollable');

    scrollElements.forEach((el) => {
      el.addEventListener('scroll', handleScroll);
    });

    // Add hidden-scrollbar class initially
    scrollElements.forEach((el) => {
      el.classList.add('hidden-scrollbar');
    });

    return () => {
      scrollElements.forEach((el) => {
        el.removeEventListener('scroll', handleScroll);
      });

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [isScrolling]);
};

export default useGlobalHideScrollbar;