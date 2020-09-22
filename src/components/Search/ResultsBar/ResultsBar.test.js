import React from 'react';
import { render } from '@testing-library/react';

import Results from "./index";

it('renders name of item if item and total count is present', () => {
  const { getByText } = render(<Results searchResults={{ items: [{ name: 'JavaJam' }], totalCount: '1' }} />);
  expect(getByText('JavaJam')).toBeInTheDocument();
  expect(getByText('Total Results: 1')).toBeInTheDocument();
});

it('total count can be a integer', () => {
  const { getByText } = render(<Results searchResults={{ items: [{ name: 'JavaJam' }], totalCount: 13 }} />);
  expect(getByText('JavaJam')).toBeInTheDocument();
  expect(getByText('Total Results: 13')).toBeInTheDocument();
});