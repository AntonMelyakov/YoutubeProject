import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YoutubeYoutubeForm from './YoutubeYoutubeForm';

describe('<YoutubeYoutubeForm />', () => {
  test('it should mount', () => {
    render(<YoutubeYoutubeForm />);
    
    const youtubeYoutubeForm = screen.getByTestId('YoutubeYoutubeForm');

    expect(youtubeYoutubeForm).toBeInTheDocument();
  });
});