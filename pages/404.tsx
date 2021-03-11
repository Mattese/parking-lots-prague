import Link from 'next/link';
import React from 'react';

export default function Custom404() {
  return (
    <h1>
      Sorry, this page doesnt exist. You can return to main page <Link href="/"> here</Link> or visit my
      <Link href="https://github.com/Mattese">githubPage</Link>
    </h1>
  );
}
