export const getImageUrl = (imageId) => `https://api.futoji.ru${imageId}`;

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return phoneNumber;

  const phoneNumberDigits = phoneNumber.replace(/\D/g, "");
  const phoneNumberLength = phoneNumberDigits.length;

  if (phoneNumberLength < 2) return phoneNumberDigits;
  if (phoneNumberLength < 5) return `+7 (${phoneNumberDigits.slice(1)}`;
  if (phoneNumberLength < 8)
    return `+7 (${phoneNumberDigits.slice(1, 4)}) ${phoneNumberDigits.slice(
      4
    )}`;
  if (phoneNumberLength < 10)
    return `+7 (${phoneNumberDigits.slice(1, 4)}) ${phoneNumberDigits.slice(
      4,
      7
    )}-${phoneNumberDigits.slice(7)}`;

  return `+7 (${phoneNumberDigits.slice(1, 4)}) ${phoneNumberDigits.slice(
    4,
    7
  )}-${phoneNumberDigits.slice(7, 9)}-${phoneNumberDigits.slice(9, 11)}`;
};

export const convertTimeRangeToTime = (timeRange) => {
  const [startTime] = timeRange.split(" - ");
  return `${startTime}:00`;
};
