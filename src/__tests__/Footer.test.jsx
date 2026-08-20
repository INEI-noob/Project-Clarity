import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocaleProvider } from '../i18n';
import { ToastProvider } from '../context/ToastContext';
import Footer from '../components/layout/Footer';

describe('Footer', () => {
  it('renders the tagline and a language selector', () => {
    render(
      <LocaleProvider>
        <ToastProvider>
          <Footer setPage={() => {}} />
        </ToastProvider>
      </LocaleProvider>
    );
    expect(screen.getByText(/digital sanctuary/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Language')).toBeInTheDocument();
  });

  it('changes the tagline when a language is selected', async () => {
    const user = userEvent.setup();
    render(
      <LocaleProvider>
        <ToastProvider>
          <Footer setPage={() => {}} />
        </ToastProvider>
      </LocaleProvider>
    );
    await user.selectOptions(screen.getByLabelText('Language'), 'af');
    expect(screen.getByText(/digitale toevlugsoord/i)).toBeInTheDocument();
  });
});