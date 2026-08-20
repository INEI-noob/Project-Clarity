import { render } from '@testing-library/react';
import axe from 'axe-core';
import { LocaleProvider } from '../i18n';
import { ToastProvider } from '../context/ToastContext';
import HomePage from '../pages/HomePage';
import GuidesPage from '../pages/GuidesPage';
import ContactPage from '../pages/ContactPage';

function renderA11y(ui) {
  return render(
    <LocaleProvider>
      <ToastProvider>{ui}</ToastProvider>
    </LocaleProvider>
  );
}

async function expectNoSeriousViolations(container) {
  const results = await axe.run(container);
  const violations = results.violations.filter(
    (v) => v.impact === 'serious' || v.impact === 'critical'
  );
  expect(violations).toEqual([]);
}

describe('accessibility (axe-core)', () => {
  it('HomePage has no serious or critical violations', async () => {
    const { container } = renderA11y(<HomePage setPage={() => {}} />);
    await expectNoSeriousViolations(container);
  });

  it('GuidesPage has no serious or critical violations', async () => {
    const { container } = renderA11y(<GuidesPage setPage={() => {}} />);
    await expectNoSeriousViolations(container);
  });

  it('ContactPage has no serious or critical violations', async () => {
    const { container } = renderA11y(<ContactPage setPage={() => {}} />);
    await expectNoSeriousViolations(container);
  });
});