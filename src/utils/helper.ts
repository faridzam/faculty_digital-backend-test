export const extractAuthHeader = (authHeader: string | undefined) => {
  const token = authHeader && authHeader.split(' ')[1];
  return token || ""
}

export function generateDummyCurrentPrice(initial_price: number, step: number) {
  if (step <= 0) {
    throw new Error("Invalid argument: step must be positive.");
  }

  const start = initial_price - (10 * step);
  const end = initial_price + (10 * step);

  const rangeSize = Math.floor((end - start) / step) + 1;
  const randomStepIndex = Math.floor(Math.random() * rangeSize);

  return start + randomStepIndex * step;
}