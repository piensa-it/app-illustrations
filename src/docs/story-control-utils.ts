export function adjacentStoryValue<T extends string>(
  items: Array<{ value: T; label: string }>,
  current: T,
  direction: -1 | 1,
) {
  const currentIndex = items.findIndex((item) => item.value === current);
  const nextIndex = (currentIndex + direction + items.length) % items.length;
  return items[nextIndex].value;
}
