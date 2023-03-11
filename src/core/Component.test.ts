import { renderDOM } from '@/core/renderDOM'
import { Parent, Child } from './Component_ex'

// const { Parent, Child } = require('./Component_ex')
describe('Component: life cycle', () => {
  const text = 'child'
  //init component to html
  const comp = new Child({
    text: text,
  })
  document.body.innerHTML = '<div id="test" ></div>'
  renderDOM('#test', comp)

  test('render', () => {
    const p = comp.getContent()
    expect(p.textContent).toBe(text)
  })

  test('Mount', () => {
    expect(comp.props.isMount).toBe(true)
  })

  test('didUpdate', () => {
    const newClass = 'didupdate true'
    const newText = 'did update component text'
    comp.setProps({ class: newClass, text: newText })

    const p = comp.getContent()

    expect(p.className).toBe(newClass)
    expect(p.textContent).toBe(newText)
  })
})

describe('Component: child component', () => {
  const clas = 'init'
  const text = 'init'
  const childText = 'child'
  //init component to html
  const child = new Child({
    text: childText,
  })
  const parent = new Parent({
    class: clas,
    text: text,
    component: child,
  })
  document.body.innerHTML = '<div id="test" ></div>'
  renderDOM('#test', parent)

  test('create html of childs', () => {
    const childHtml = parent.childrenHTML.elements.component
    expect(childHtml.tagName).toBe('P')
    expect(childHtml.textContent).toBe(childText)
  })

  test('use html of childs', () => {
    const core = parent.getContent()

    const p = core.getElementsByTagName('p')[0]

    expect(p.tagName).toBe('P')
    expect(p.textContent).toBe(childText)
  })

  test('message to children about the event', () => {
    parent.setProps({ class: 'up', text: 'up' })
    expect(child.props.isMount).toBe(true)
    expect(child.props.isDispatchUpdate).toBe(true)
  })

  test('render at change props childs', () => {
    const textNewChild = 'newChild'
    const newChild = new Child({ text: textNewChild })
    parent.setProps({ component: newChild })

    const html = parent.getContent()
    const tagP = html.getElementsByTagName('p')[0]
    expect(tagP.textContent).toBe(textNewChild)
  })
})

describe('Component: Add/RemoveEvents', () => {
  const text = 'text'
  const className = 'class_name'

  let countTest = 0
  const handle = () => {
    countTest++
  }
  const comp = new Child({
    text,
    class: className,
    events: { click: handle },
  })

  test('handle click', () => {
    // imition click
    const html = comp.getContent()
    html.click()
    html.click()
    //
    expect(countTest).toBe(2) //if the result was 3 or more then the deletion does not work
  })
})
