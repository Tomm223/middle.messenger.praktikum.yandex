import Component from './Component'

export function renderDOM(query: string, block: Component) {
  const root = document.querySelector(query) as HTMLElement
  // root.innerHTML = ''
  // Можно завязаться на реализации вашего класса Block
  const template = block.getContent() as HTMLElement

  root.appendChild(template)

  block.dispatchComponentDidMount()

  return root
}
