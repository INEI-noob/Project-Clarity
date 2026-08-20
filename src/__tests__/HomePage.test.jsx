import { render, screen } from '@testing-library/react';
import HomePage from '../pages/HomePage';

describe('HomePage', () => {
  it('renders the hero heading', () => {
    render(<HomePage setPage={() => {}} />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Clarity/i })
    ).toBeInTheDocument();
  });

  it('does not crash when rendered', () => {
    render(<HomePage setPage={() => {}} />);
    expect(screen.getByText(/Project Clarity/i)).toBeInTheDocument();
  });
});