/* eslint-disable no-undef */
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import Login from "../components/user/Login";

describe("Login Component", () => {
  test("renders Login component with all elements", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /sign in/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign in/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(
      await screen.findByText(/email không được để trống!/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/password không được để trống!/i)
    ).toBeInTheDocument();
  });

  // test("toggles password visibility", async () => {
  //   render(
  //     <MemoryRouter>
  //       <Login />
  //     </MemoryRouter>
  //   );

  //   const passwordInput = screen.getByPlaceholderText(/enter password/i);
  //   const toggleVisibilityButton = screen.getByTestId("toggle-password-visibility");

  //   expect(passwordInput).toHaveAttribute("type", "password");

  //   fireEvent.click(toggleVisibilityButton);
  //   await screen.findByPlaceholderText(/enter password/i);
  //   expect(passwordInput).toHaveAttribute("type", "text");

  //   fireEvent.click(toggleVisibilityButton);
  //   await screen.findByPlaceholderText(/enter password/i);
  //   expect(passwordInput).toHaveAttribute("type", "password");
  // });

  test("handles form submission correctly", async () => {
    const mockOnSubmit = vi.fn();

    render(
      <MemoryRouter>
        <Login onSubmit={mockOnSubmit} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await screen.findByRole("button", { name: /sign in/i });

    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });
});
