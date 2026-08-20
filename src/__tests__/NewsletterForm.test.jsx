import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from '../context/ToastContext';
import NewsletterForm from '../components/NewsletterForm';

const renderForm = () =>
  render(
    <ToastProvider>
      <NewsletterForm />
    </ToastProvider>
  );

describe('NewsletterForm', () => {
  it('rejects an invalid email with a toast', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Email address'), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /Subscribe/i }));
    expect(await screen.findByText(/Please enter a valid email/i)).toBeInTheDocument();
  });

  it('falls back to local storage when EmailJS is unconfigured', async () => {
    const user = userEvent.setup();
    renderForm();
    await user.type(screen.getByLabelText('Email address'), 'friend@example.com');
    await user.click(screen.getByRole('button', { name: /Subscribe/i }));
    expect(await screen.findByText(/watch your inbox/i)).toBeInTheDocument();
    expect(JSON.parse(window.localStorage.getItem('clarity_newsletter'))).toContain('friend@example.com');
  });
});