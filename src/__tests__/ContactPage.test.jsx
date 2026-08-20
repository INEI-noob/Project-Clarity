import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider } from '../context/ToastContext';
import ContactPage from '../pages/ContactPage';

const renderPage = () =>
  render(
    <ToastProvider>
      <ContactPage setPage={() => {}} />
    </ToastProvider>
  );

describe('ContactPage', () => {
  it('renders the contact form', () => {
    renderPage();
    expect(
      screen.getByRole('heading', { level: 1, name: /Reach the Sanctuary/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('stores messages locally when EmailJS is unconfigured', async () => {
    const user = userEvent.setup();
    renderPage();
    await user.type(screen.getByLabelText('Message'), 'A gentle question about the library');
    await user.click(screen.getByRole('button', { name: /Send message/i }));
    expect(await screen.findByText(/Message received/i)).toBeInTheDocument();
    const stored = JSON.parse(window.localStorage.getItem('clarity_messages'));
    expect(stored[0].message).toBe('A gentle question about the library');
  });
});