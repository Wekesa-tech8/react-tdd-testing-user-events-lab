import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';  // Import this line
import App from '../App';

describe('Newsletter Signup Form', () => {
  test('renders the form with name, email, interests checkboxes, and a submit button', () => {
    render(<App />);
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/interests/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('allows the user to type in name and email fields', () => {
    render(<App />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
  });

  test('allows the user to select interests', () => {
    render(<App />);

    const interestCheckbox = screen.getByLabelText(/interest 1/i);

    fireEvent.click(interestCheckbox);

    expect(interestCheckbox.checked).toBe(true);
  });

  test('displays a success message with the user’s name and selected interests upon form submission', () => {
    render(<App />);

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john@example.com' } });
    fireEvent.click(screen.getByLabelText(/interest 1/i));
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/thank you for signing up, John Doe!/i)).toBeInTheDocument();
    expect(screen.getByText(/your interests: interest 1/i)).toBeInTheDocument();
  });
});
