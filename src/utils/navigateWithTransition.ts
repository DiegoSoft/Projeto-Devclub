import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

declare global {
  interface Window {
    __pageTransition?: (
      destinationHref: string,
      clickOriginX?: number,
      clickOriginY?: number,
    ) => void;
  }
}

function getNavbarOffset(): number {
  const navbarElement = document.querySelector('.navbar-wrapper') as HTMLElement | null;
  const navbarHeight = navbarElement?.getBoundingClientRect().height || 0;
  return navbarHeight + 16;
}

function updateUrlHash(destinationHref: string): void {
  if (!destinationHref.startsWith('#')) return;
  window.history.pushState(null, '', destinationHref);
}

function scrollToSection(destinationHref: string): void {
  const targetSection = document.querySelector(destinationHref) as HTMLElement | null;

  if (!targetSection) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targetPosition = Math.max(0, targetSection.getBoundingClientRect().top + window.scrollY - getNavbarOffset());

  if (prefersReducedMotion) {
    window.scrollTo(0, targetPosition);
    updateUrlHash(destinationHref);
    return;
  }

  const scrollDistance = Math.abs(window.scrollY - targetPosition);
  const transitionDuration = gsap.utils.clamp(0.75, 1.55, scrollDistance / 1400);

  gsap.killTweensOf(window);

  gsap.to(window, {
    scrollTo: {
      y: targetPosition,
      autoKill: true,
    },
    duration: transitionDuration,
    ease: 'power3.inOut',
    onComplete: () => updateUrlHash(destinationHref),
  });
}

export function handleNavClick(event: Event): void {
  event.preventDefault();
  const mouseEvent = event as MouseEvent;
  const targetElement = event.currentTarget as HTMLElement | null;
  let clickX = mouseEvent.clientX;
  let clickY = mouseEvent.clientY;
  if (clickX === 0 && clickY === 0 && (event as MouseEvent).detail === 0 && targetElement) {
    const boundingRectangle = targetElement.getBoundingClientRect();
    clickX = boundingRectangle.left + boundingRectangle.width / 2;
    clickY = boundingRectangle.top + boundingRectangle.height / 2;
  }
  const destinationHref = targetElement?.getAttribute('href');
  if (destinationHref && window.__pageTransition) {
    window.__pageTransition(destinationHref, clickX, clickY);
    return;
  }

  if (destinationHref?.startsWith('#')) {
    scrollToSection(destinationHref);
    return;
  }

  if (destinationHref) {
    window.location.href = destinationHref;
  }
}
