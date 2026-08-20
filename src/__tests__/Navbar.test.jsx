import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider } from '../i18n';
import Navbar from '../components/layout/Navbar';

describe('Navbar', () => {
  it('renders the default navigation links in English', () => {
    render(
      <LocaleProvider>
        <Navbar setPage={() => {}} />
      </LocaleProvider>
    );
    expect(screen.getByRole('button', { name: 'Guides' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Resources' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Crisis/i })).toBeInTheDocument();
  });

  it('switches the UI language via the dropdown and persists the choice', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <Navbar setPage={() => {}} />
      </LocaleProvider>
    );
    await user.click(screen.getByRole('button', { name: 'Language' }));
    await user.click(screen.getByRole('option', { name: 'isiZulu' }));
    expect(screen.getByRole('button', { name: 'Imihlahlandlela' })).toBeInTheDocument();
    expect(window.localStorage.getItem('clarity_locale')).toBe('zu');
  });
});