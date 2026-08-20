import { act, render, screen, fireEvent } from '@testing-library/react';
import { LocaleProvider } from '../i18n';
import WelcomeOverlay from '../components/WelcomeOverlay';

describe('WelcomeOverlay', () => {
  beforeEach(() => {
    window.localStorage.removeItem('clarity_welcomed');
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('shows the welcome dialog for first-time visitors', () => {
    render(
      <LocaleProvider>
        <WelcomeOverlay />
      </LocaleProvider>
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    expect(screen.getByRole('dialog', { name: /Welcome to Sanctuary/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Enter the Sanctuary' })).toBeInTheDocument();
  });

  it('remembers the visit once dismissed', () => {
    render(
      <LocaleProvider>
        <WelcomeOverlay />
      </LocaleProvider>
    );
    act(() => {
      vi.advanceTimersByTime(1600);
    });
    fireEvent.click(screen.getByRole('button', { name: 'Enter the Sanctuary' }));
    expect(window.localStorage.getItem('clarity_welcomed')).toBe('1');
  });
});