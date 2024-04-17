import React from 'react';
import { getAccessToken, getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

import Highlight from '../../components/Highlight';

export default withPageAuthRequired(
  async function SSRPage() {
    const session = await getSession();
    console.log(session);
    const { accessToken } = await getAccessToken();

    return (
      <>
        <div className="mb-5" data-testid="ssr">
          <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
          <div data-testid="ssr-text">
            <p>
              You can protect a server-side rendered page by wrapping it with <code>withPageAuthRequired</code>. Only
              logged in users will be able to access it. If the user is logged out, they will be redirected to the login
              page instead.{' '}
            </p>
          </div>
        </div>
        <div className="result-block-container" data-testid="ssr-json">
          <div className="result-block">
            <h6 className="muted">User</h6>
            <Highlight>{JSON.stringify(session.user, null, 2)}</Highlight>
          </div>
        </div>
        <div className="result-block-container" data-testid="ssr-json">
          <div className="result-block">
            <h6 className="muted">Access Token</h6>
            <Highlight>{JSON.stringify(accessToken, null, 2)}</Highlight>
          </div>
        </div>
      </>
    );
  },
  { returnTo: '/ssr' }
);
