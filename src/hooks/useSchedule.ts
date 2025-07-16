import { fetchSchedule } from '@/src/api/enpoints/schedule';
import { ScheduledAnime } from '@/src/types/schedule';
import { useCallback, useEffect, useState } from 'react';

// Cache duration: 5 minutes
const CACHE_DURATION = 5 * 60 * 1000;

// In-memory cache for schedule data, keyed by date string
const scheduleCache = new Map<string, { data: ScheduledAnime[]; timestamp: number }>();

export const useSchedule = (initialDate: string) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [schedule, setSchedule] = useState<ScheduledAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Loads the schedule for a given date.
   * Uses cache if it's valid and forceRefresh is false.
   */
  const loadSchedule = useCallback(async (date: string, forceRefresh = false) => {
    const cached = scheduleCache.get(date);
    const isValidCache = cached && (Date.now() - cached.timestamp < CACHE_DURATION);

    // Use cached data if available and not force refreshing
    if (isValidCache && !forceRefresh) {
      setSchedule(cached.data);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch fresh data and cache it
      const data = await fetchSchedule(date);
      scheduleCache.set(date, { data, timestamp: Date.now() });
      setSchedule(data);
    } catch (err) {
      // Handle fetch errors
      const message = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Called when a user selects a new date on the calendar.
   * Uses cache if available; otherwise, loads fresh data.
   */
  const handleDayPress = useCallback((day: { dateString: string }) => {
    const newDate = day.dateString;

    // Skip if the same date is selected again
    if (newDate === selectedDate) return;

    setSelectedDate(newDate);

    const cached = scheduleCache.get(newDate);
    const isValid = cached && (Date.now() - cached.timestamp < CACHE_DURATION);

    if (isValid) {
      setSchedule(cached.data);
    } else {
      setSchedule([]); // Clear current schedule while loading new data
      loadSchedule(newDate);
    }
  }, [selectedDate, loadSchedule]);

  /**
   * Triggered by pull-to-refresh.
   * Forces a re-fetch of the data regardless of cache state.
   */
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadSchedule(selectedDate, true);
    } finally {
      setRefreshing(false);
    }
  }, [selectedDate, loadSchedule]);

  /**
   * Initial load or when `selectedDate` changes.
   * Automatically fetches schedule data.
   */
  useEffect(() => {
    loadSchedule(selectedDate);
  }, [selectedDate, loadSchedule]);

  // Return relevant state and handlers for use in UI components
  return {
    selectedDate,
    setSelectedDate,
    schedule,
    loading,
    refreshing,
    error,
    handleDayPress,
    handleRefresh,
  };
};
