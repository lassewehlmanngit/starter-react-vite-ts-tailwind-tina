import React from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ButtonLink } from '@/shared/ui/ButtonLink';

describe('ButtonLink', () => {
  it('renders a link with provided text', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/en/about">Go</ButtonLink>
      </MemoryRouter>,
    );

    expect(screen.getByRole('link', { name: 'Go' })).toHaveAttribute('href', '/en/about');
  });
});

