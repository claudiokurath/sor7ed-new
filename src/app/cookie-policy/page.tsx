export const metadata = {
  title: 'Cookie policy',
  description: 'How SOR7ED uses cookies and similar technologies.',
};

export default function CookiePolicyPage() {
  return (
    <article className="max-w-3xl mx-auto px-5 py-20">
      <p className="kicker">Cookie policy</p>
      <h1 className="text-5xl mb-6">Cookies and similar technologies.</h1>

      <p className="text-base mb-4">
        SOR7ED uses the minimum cookies needed for sign-up, session security, and accessibility
        preferences. We do not use advertising or cross-site tracking cookies.
      </p>

      <h2 className="text-3xl mt-8 mb-2">What we set</h2>
      <ul className="text-sm space-y-2 mb-6">
        <li>▸ Session cookies — to keep you logged into the member area</li>
        <li>▸ <span className="mono">sor7ed-a11y</span> — your accessibility toggles, stored on your device</li>
        <li>▸ <span className="mono">sor7ed-cookie-ack</span> — confirmation you saw this banner</li>
      </ul>

      <h2 className="text-3xl mt-8 mb-2">What we do not do</h2>
      <ul className="text-sm space-y-2 mb-6">
        <li>✕ Sell your data</li>
        <li>✕ Share with advertisers</li>
        <li>✕ Profile you across sites</li>
      </ul>

      <h2 className="text-3xl mt-8 mb-2">Your rights</h2>
      <p className="text-base">
        Under UK GDPR you can request access, correction, or deletion of any data we hold. Email
        the team at <span className="mono">hello@sor7ed.com</span>.
      </p>
    </article>
  );
}
