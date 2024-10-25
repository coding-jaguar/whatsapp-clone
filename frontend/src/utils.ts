export const getAusTime = (timestamp: string) => {
  // Convert the timestamp to a Date object
  const date = new Date(timestamp);

  // Convert the Date object to Australia's Eastern Daylight Time (AEDT)
  const options = { timeZone: "Australia/Sydney", hour12: false }; // Use 'Australia/Brisbane' for AEST without daylight savings
  const localTime = date.toLocaleString("en-AU", options);

  return localTime;
};
