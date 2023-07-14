import AbstractView from 'types/classes/abstract-view';

type TAbstract = AbstractView | Element;

export const createElement = (template: string) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

export const render = (
  container: TAbstract,
  child: TAbstract,
  position: InsertPosition,
) => {
  const element = container instanceof AbstractView ? container.element : container;
  const content = child instanceof AbstractView ? child.element : child;

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

export const remove = (component: AbstractView) => {
  component.element.remove();
  component.removeElement();
};

export const replace = (
  oldChildEl: TAbstract,
  newChildEl: TAbstract,
) => {
  const newChild = newChildEl instanceof AbstractView ? newChildEl.element : newChildEl;
  const oldChild = oldChildEl instanceof AbstractView ? oldChildEl.element : oldChildEl;

  const parent = oldChild.parentElement;

  if (!parent || !oldChild || !newChild) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};
