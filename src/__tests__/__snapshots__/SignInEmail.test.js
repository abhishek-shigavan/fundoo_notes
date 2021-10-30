import React from 'react';
import ReactDOM from 'react-dom';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import SignInEmail from '../../components/SignInEmail/SignInEmail';


afterEach(cleanup);
it("component renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignInEmail></SignInEmail>, div)
});

test('element should be in component', ()=> {
    render(<SignInEmail />);
    const textfieldElement = screen.getByTestId('username');
    expect(textfieldElement).toBeInTheDocument();
})

test('Given subtitle should be in component', ()=> {
    render(<SignInEmail />);
    const subtitleElement = screen.getByTestId('sub-title');
    expect(subtitleElement).toHaveTextContent('Use your FunDo Account');
})

