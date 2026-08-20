import { render, screen } from '@testing-library/react';
import { LocaleProvider } from '../i18n';
import { ToastProvider } from '../context/ToastContext';
import ModerationPage from '../pages/ModerationPage';

function renderModeration() {
  return render(
    <LocaleProvider>
      <ToastProvider>
        <ModerationPage />
      </ToastProvider>
    </LocaleProvider>
  );
}

describe('ModerationPage', () => {
  it('asks for the moderator password to be configured when VITE_MODERATOR_PASSWORD is missing', () => {
    renderModeration();
    expect(screen.getByText("Moderation isn't configured")).toBeInTheDocument();
  });
});