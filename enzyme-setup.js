import Adapter from '@cfaester/enzyme-adapter-react-18';
import { configure } from 'enzyme';

const configureEnzyme = () => {
  configure({ adapter: new Adapter() });
};

const consoleError = console.error;
let mockConsoleError = jest.spyOn(console, 'error').mockImplementation((...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    if (
      message.includes('When testing, code that causes React state updates should be wrapped into act(...)') ||
      message.includes('antd')
    ) {
      return;
    }

    return consoleError.call(console, args);
  });

configureEnzyme();
