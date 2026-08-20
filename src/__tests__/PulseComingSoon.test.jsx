import { render, screen } from '@testing-library/react';
import PulseComingSoon from '../pages/PulseComingSoon';

describe('PulseComingSoon', () => {
  it('shows the under-construction state', () => {
    render(<PulseComingSoon setPage={() => {}} />);
    expect(screen.getByText(/Under Construction/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: /The Pulse/i })).toBeInTheDocument();
  });
});