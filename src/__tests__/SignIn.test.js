import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup, render, screen } from '@testing-library/react';
import SignIn from '../components/SignIn';

afterEach(cleanup);
it("component renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<SignIn></SignIn>, div)
})

test('renders subtitle of component', () => {
    render(<SignIn />);
    const titleElement = screen.getByText(/Use your FunDo Account/i);
    expect(titleElement).toBeInTheDocument();
})