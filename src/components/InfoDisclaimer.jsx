import React from 'react';
import { AlertTriangle } from 'lucide-react';

const InfoDisclaimer = ({ compact = false }) => (
  <div
    className={`rounded-2xl border border-amber-200 bg-amber-50 flex items-start gap-3 ${
      compact ? 'p-4' : 'p-5'
    }`}
  >
    <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
    <div>
      {!compact && (
        <p className="font-bold text-amber-900 text-sm mb-0.5">
          Please verify before relying on this
        </p>
      )}
      <p className="text-amber-800/90 text-xs leading-relaxed">
        Some contact details and organizations listed here are still being verified and may be
        outdated or inaccurate. Please double-check before reaching out, especially in an
        emergency. We're updating everything as fast as we can.
      </p>
    </div>
  </div>
);

export default InfoDisclaimer;