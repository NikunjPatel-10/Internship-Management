// To convert String to Minutes
function timeStringToMinutes(timeString) {
  // Split the time string by 'hr' to separate hours and minutes
  const parts = timeString.split(" ");

  let totalMinutes = 0;

  // Loop through the parts to add up the minutes
  for (const part of parts) {
    // Check if the part contains 'hr' or 'm' to determine if it's hours or minutes
    if (part.includes("hr")) {
      // Extract the hours and convert to minutes
      totalMinutes += parseInt(part.replace("hr", ""), 10) * 60;
    } else if (part.includes("m")) {
      // Extract the minutes
      totalMinutes += parseInt(part.replace("m", ""), 10);
    }
  }

  return totalMinutes;
}

// To conver minutes to hr and m format
function minutesToHoursAndMinutes(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}hr ${minutes}m`;
}
// Add two time strings
export const addDuration = (time1, time2) => {
  const minutes1 = timeStringToMinutes(time1);
  const minutes2 = timeStringToMinutes(time2);

  const totalMinutes = minutes1 + minutes2;

  return minutesToHoursAndMinutes(totalMinutes);
};

// Subtract two time strings
export const subtractDurations = (duration1, duration2) => {
  const minutes1 = timeStringToMinutes(duration1);
  const minutes2 = timeStringToMinutes(duration2);

  const totalMinutes = minutes1 - minutes2;

  return minutesToHoursAndMinutes(totalMinutes);
};
