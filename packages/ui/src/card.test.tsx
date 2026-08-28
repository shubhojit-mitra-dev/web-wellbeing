import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card component suite', () => {
  it('renders card shell with all compound elements', () => {
    render(
      <Card className="custom-card">
        <CardHeader>
          <CardTitle>Card Title Header</CardTitle>
          <CardDescription>Card Description Subtext</CardDescription>
        </CardHeader>
        <CardContent>Main Content Area</CardContent>
        <CardFooter>Footer Actions</CardFooter>
      </Card>,
    );

    expect(screen.getByText('Card Title Header')).toBeInTheDocument();
    expect(screen.getByText('Card Description Subtext')).toBeInTheDocument();
    expect(screen.getByText('Main Content Area')).toBeInTheDocument();
    expect(screen.getByText('Footer Actions')).toBeInTheDocument();
  });
});
