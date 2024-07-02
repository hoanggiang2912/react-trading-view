export function convertMillisecondsToDate(milliseconds) {
  const date = new Date(milliseconds);
  const year = date.getFullYear();
  // Pad the month and day with leading zeros if needed
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatCurrency(amount) {
  let formattedAmount;
  if (amount >= 1e9) {
    formattedAmount = `${(amount / 1e9).toFixed(2)}B`;
  } else if (amount >= 1e6) {
    formattedAmount = `${(amount / 1e6).toFixed(2)}M`;
  } else {
    formattedAmount = amount.toFixed(2);
  }
  return `$${formattedAmount}`;
}

export function priceToPixel(price, minPrice, maxPrice, maxHeight) {
  // Calculate the total price range
  const priceRange = maxPrice - minPrice;

  // Calculate the scaling factor (pixels per price unit)
  const scalingFactor = maxHeight / priceRange;

  // Convert the price to a pixel value
  // Note: We subtract from maxHeight to invert the y-axis if necessary
  // This assumes a coordinate system where 0 is at the top and increases downward
  const pixelValue = maxHeight - (price - minPrice) * scalingFactor;

  return pixelValue;
}
