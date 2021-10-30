import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup } from '@testing-library/react';
import SignInPassword from '../components/SignInPassword/SignInPassword';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

afterEach(cleanup);
it("component renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignInPassword></SignInPassword>, div)
});

it("renders SignInPassword with props value correctly", () => {
    const { getByTestId } = render(<SignInPassword email="peterparkar@gmail.com"></SignInPassword>)
    expect(getByTestId('sign-in-password')).toHaveTextContent("peterparkar@gmail.com");
});

it("matches snapshot", ()=> {
    const virtualDom = renderer.create(<SignInPassword label="something@todo.com"></SignInPassword>).toJSON();
    expect(virtualDom).toMatchSnapshot();
})
