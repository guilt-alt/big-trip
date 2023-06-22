export const createElement = (template: string) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const render = (
  element: Element,
  content: Element,
  position: InsertPosition,
): void => {
  switch (position) {
    case 'afterbegin':
      element.insertAdjacentElement(position, content);
      break;
    case 'afterend':
      element.insertAdjacentElement(position, content);
      break;
    case 'beforeend':
      element.insertAdjacentElement(position, content);
      break;
    case 'beforebegin':
      element.insertAdjacentElement(position, content);
      break;
    default:
      throw new Error('Ни один кейс не совпал.');
  }
};
