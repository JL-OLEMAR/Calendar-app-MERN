/* global jest */
import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import { createSerializer } from 'enzyme-to-json'

Enzyme.configure({ adapter: new Adapter() })
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' })); // eslint-disable-line

HTMLCanvasElement.prototype.getContext = () => {} // eslint-disable-line

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  close: jest.fn()
}))
