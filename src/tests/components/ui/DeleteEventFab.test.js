/* global jest, describe, test, expect */
import '@testing-library/jest-dom'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import { eventStartDeleted } from '../../../actions/events'
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab'

jest.mock('../../../actions/events', () => ({
  eventStartDeleted: jest.fn()
}))

const middlewares = [thunk]
const mockStore = configureStore(middlewares)
const initState = {}
const store = mockStore(initState)

store.dispatch = jest.fn()

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
)

describe('Pruebas en <DeleteEventFab />', () => {
  test('debe de mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot()
  })

  test('debe de llamar el eventStartDeleted al hacer click', () => {
    wrapper.find('button').prop('onClick')()
    expect(eventStartDeleted).toHaveBeenCalled()
  })
})
