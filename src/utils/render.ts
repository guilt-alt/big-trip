const render = (
  container: Element,
  content: string,
  position: InsertPosition,
): void => {
  container.insertAdjacentHTML(position, content);
};

export default render;
