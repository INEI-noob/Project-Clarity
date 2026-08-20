import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider } from '../i18n';
import { ToastProvider } from '../context/ToastContext';
import GuideFeedback from '../components/GuideFeedback';

describe('GuideFeedback', () => {
  it('saves and removes a guide via localStorage', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <ToastProvider>
          <GuideFeedback guideId="coming-out" guideTitle="Coming Out" />
        </ToastProvider>
      </LocaleProvider>
    );

    expect(JSON.parse(window.localStorage.getItem('clarity_saved_guides') || '[]')).toEqual([]);

    await user.click(screen.getByRole('button', { name: /Save this guide/i }));
    expect(JSON.parse(window.localStorage.getItem('clarity_saved_guides'))).toContain('coming-out');
    expect(screen.getByRole('button', { name: /Saved to your guides/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /View saved/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Saved to your guides/i }));
    expect(JSON.parse(window.localStorage.getItem('clarity_saved_guides'))).not.toContain('coming-out');
  });
});