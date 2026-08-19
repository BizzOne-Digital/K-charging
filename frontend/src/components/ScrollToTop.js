import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            intersectionObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    const observeUnrevealed = () => {
      document.querySelectorAll('.reveal:not(.in-view)').forEach(el => intersectionObserver.observe(el));
    };

    // Initial scan for content already in the DOM
    observeUnrevealed();

    // Content that mounts later (after an async API call resolves) also needs to be caught,
    // otherwise it stays at opacity:0 forever — invisible, not just unanimated.
    const mutationObserver = new MutationObserver(observeUnrevealed);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
