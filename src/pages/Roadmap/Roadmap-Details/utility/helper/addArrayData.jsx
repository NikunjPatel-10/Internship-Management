// Function to parse duration strings and convert them to minutes
const parseDuration = (durationString) => {
  const parts = durationString.split(" ");
  let totalMinutes = 0;
  for (const part of parts) {
    if (part.includes("h")) {
      totalMinutes += parseInt(part.replace("hr", "")) * 60;
    } else if (part.includes("m")) {
      totalMinutes += parseInt(part.replace("m", ""));
    }
  }
  return totalMinutes;
};
export const addData = (data) => {
  // Add up all durations
  let totalMinutes = 0;
  for (const item of data) {
    totalMinutes += parseDuration(item.duration);
  }

  // Convert total minutes to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const TotalDuration = `${hours}hr ${minutes}m`;
  return TotalDuration;
};
