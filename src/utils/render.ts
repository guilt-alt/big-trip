const render = (
  container: Element,
  content: Function,
  position: InsertPosition,
): void => {
  container.insertAdjacentHTML(position, content());
};

export default render;
