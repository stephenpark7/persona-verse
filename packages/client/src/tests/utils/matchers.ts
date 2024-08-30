export const htmlElementsContainText = (
  arr: HTMLElement[],
  text: string,
): boolean => {
  return arr.some((element) => element.textContent?.includes(text));
};
