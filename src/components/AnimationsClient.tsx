'use client';

import { usePortfolioAnimations } from '@/components/usePortfolioAnimations';

/**
 * Thin client component that boots portfolio animations.
 * Rendered inside server-component pages so the page itself
 * does NOT need "use client" and can fetch data on the server.
 */
export default function AnimationsClient() {
  usePortfolioAnimations();
  return null;
}
