import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import YoutubeYoutubeList from './YoutubeYoutubeList';

describe('<YoutubeYoutubeList />', () => {
  test('it should mount', () => {
    render(<YoutubeYoutubeList />);
    
    const youtubeYoutubeList = screen.getByTestId('YoutubeYoutubeList');

    expect(youtubeYoutubeList).toBeInTheDocument();
  });
});