import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Youtube from './Youtube';

describe('<Youtube />', () => {
  test('it should mount', () => {
    render(<Youtube />);
    
    const youtube = screen.getByTestId('Youtube');

    expect(youtube).toBeInTheDocument();
  });
});