import { useCallback } from 'react';

export function useCanvasPersistence(templateId: string) {
  const getProgress = useCallback((): string | null => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(`coloring_progress_${templateId}`);
  }, [templateId]);

  const saveProgress = useCallback((data: string) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(`coloring_progress_${templateId}`, data);
  }, [templateId]);

  const clearProgress = useCallback(() => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(`coloring_progress_${templateId}`);
  }, [templateId]);

  return { getProgress, saveProgress, clearProgress };
}
