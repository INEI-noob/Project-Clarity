import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ResourcesPage from '../pages/ResourcesPage';

describe('ResourcesPage', () => {
  it('renders the header and search', () => {
    render(<ResourcesPage />);
    expect(
      screen.getByRole('heading', { level: 1, name: /Find Your Support/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('searchbox', { name: /Search resources/i })).toBeInTheDocument();
  });

  it('lists resources from the directory', () => {
    render(<ResourcesPage />);
    expect(screen.getByText(/Triangle Project Crisis Line/i)).toBeInTheDocument();
    expect(screen.getByText(/SADAG Suicide Crisis Line/i)).toBeInTheDocument();
  });

  it('filters by category', async () => {
    const user = userEvent.setup();
    render(<ResourcesPage />);
    await user.click(screen.getByRole('button', { name: /Housing & Shelters/i }));
    expect(screen.getByText(/Pride Shelter Trust/i)).toBeInTheDocument();
    expect(screen.queryByText(/Triangle Project Crisis Line/i)).not.toBeInTheDocument();
  });

  it('searches resources', async () => {
    const user = userEvent.setup();
    render(<ResourcesPage />);
    await user.type(screen.getByRole('searchbox', { name: /Search resources/i }), 'PrEP');
    expect(screen.getByText(/Anova Health Institute/i)).toBeInTheDocument();
    expect(screen.queryByText(/Pride Shelter Trust/i)).not.toBeInTheDocument();
  });

  it('filters by region', async () => {
    const user = userEvent.setup();
    render(<ResourcesPage />);
    await user.click(screen.getByRole('button', { name: 'Gauteng' }));
    expect(screen.getByText(/OUT LGBT Well-being/i)).toBeInTheDocument();
    expect(screen.queryByText(/Triangle Project Crisis Line/i)).not.toBeInTheDocument();
  });
});