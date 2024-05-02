import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YoutubeYoutubeMainVideo from './YoutubeYoutubeMainVideo';

describe('<YoutubeYoutubeMainVideo />', () => {
  test('it should mount', () => {
    render(<YoutubeYoutubeMainVideo />);
    
    const youtubeYoutubeMainVideo = screen.getByTestId('YoutubeYoutubeMainVideo');

    expect(youtubeYoutubeMainVideo).toBeInTheDocument();
  });
});