import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '@/shared/ui/Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input aria-label="Test input" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders different types', () => {
    const { rerender } = render(<Input type="email" aria-label="Email" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');

    rerender(<Input type="password" aria-label="Password" />);
    // Password inputs don't have textbox role
    expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
  });

  it('handles value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input aria-label="Test" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'hello');

    expect(handleChange).toHaveBeenCalled();
    expect(input).toHaveValue('hello');
  });

  it('can be disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input disabled aria-label="Disabled" onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();

    await user.type(input, 'test');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('shows error state', () => {
    render(<Input aria-label="Error input" aria-invalid="true" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('accepts placeholder', () => {
    render(<Input placeholder="Enter text..." aria-label="With placeholder" />);
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
  });

  it('supports controlled value', () => {
    const { rerender } = render(<Input value="initial" aria-label="Controlled" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('initial');

    rerender(<Input value="updated" aria-label="Controlled" readOnly />);
    expect(screen.getByRole('textbox')).toHaveValue('updated');
  });

  it('forwards ref correctly', () => {
    const ref = vi.fn();
    render(<Input ref={ref} aria-label="With ref" />);
    expect(ref).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" aria-label="Custom" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });
});
