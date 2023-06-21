import { IPosition } from 'type/interfaces';

export const RenderPosition: IPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const createElement = (template: string) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const render = (
  container: Element,
  content: ChildNode | null,
  position: InsertPosition,
): void => {
  if (!content) {
    throw new Error('Can render only ChildNode');
  }

  switch (position) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(content);
      break;
    case RenderPosition.BEFOREEND:
      container.append(content);
      break;
    default:
      throw new Error('Ни один кейс не совпал.');
  }
};
