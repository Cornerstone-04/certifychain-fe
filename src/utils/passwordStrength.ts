export const getPasswordStrength = (password: string) => {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2)
    return {
      score,
      label: "Weak",
      color: "bg-red-500",
      "text-color": "text-red-500",
    };
  if (score === 3)
    return {
      score,
      label: "Moderate",
      color: "bg-yellow-500",
      "text-color": "text-yellow-500",
    };
  return {
    score,
    label: "Strong",
    color: "bg-green-500",
    "text-color": "text-green-500",
  };
};
