export const formatTime = (timeString: string): string => {
  try {
    let date;

    if (timeString.includes('T') || timeString.includes('Z')) {
      date = new Date(timeString);
    } else if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(timeString)) {
      date = new Date(timeString.replace(' ', 'T'));
    } else if (/^\d{2}:\d{2}$/.test(timeString)) {
      const today = new Date();
      const [hours, minutes] = timeString.split(':').map(Number);
      date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hours, minutes);
    } else {
      date = new Date(timeString);
    }

    if (isNaN(date.getTime())) return timeString;

    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      year: 'numeric',
    });
  } catch {
    return timeString;
  }
};