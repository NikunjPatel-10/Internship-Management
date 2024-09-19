import { defaultVariantColorsResolver, rem } from "@mantine/core";

export const variantColorResolver = (input) => {
  const defaultResolvedColors = defaultVariantColorsResolver(input);

  // Completely override Badge variant
  if (input.variant === "notStarted") {
    return {
      background: "#f8f9fa",
      hover: "#f8f9fa",
      border: `${rem(1)} solid transparent`,
      color: "#868e96",
    };
  }
  if (input.variant === "completed") {
    return {
      background: "#ebfbee",
      hover: "#f8f9fa",
      border: `${rem(1)} solid transparent`,
      color: "#40c057",
    };
  }
  if (input.variant === "inProgress") {
    return {
      background: "#fff7e6",
      hover: "#f8f9fa",
      border: `${rem(1)} solid transparent`,
      color: "#fdb914",
    };
  }

  return defaultResolvedColors;
};
