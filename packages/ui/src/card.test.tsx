import { describe, it, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card';

describe('Card component suite', () => {
  it('instantiates Card with all compound elements', () => {
    const el = (
      <Card className="custom-card">
        <CardHeader className="custom-header">
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content Body</CardContent>
        <CardFooter>Footer Info</CardFooter>
      </Card>
    );

    expect(el.type).toBe(Card);
    expect(el.props.className).toContain('custom-card');
  });
});
