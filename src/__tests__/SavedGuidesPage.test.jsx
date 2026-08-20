import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SavedGuidesPage from '../pages/SavedGuidesPage';

describe('SavedGuidesPage', () => {
  it('shows an empty state when nothing is saved', () => {
    window.localStorage.setItem('clarity_saved_guides', '[]');
    render(<SavedGuidesPage setPage={() => {}} />);
    expect(screen.getByText(/Nothing saved yet/i)).toBeInTheDocument();
  });

  it('lists saved guides and removes them', async () => {
    const user = userEvent.setup();
    window.localStorage.setItem('clarity_saved_guides', JSON.stringify(['coming-out', 'healthcare']));
    render(<SavedGuidesPage setPage={() => {}} />);
    expect(screen.getByText('Coming Out')).toBeInTheDocument();
    expect(screen.getByText('Healthcare')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Remove Coming Out/i }));
    expect(screen.queryByText('Coming Out')).not.toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('clarity_saved_guides'))).toEqual(['healthcare']);
  });
});