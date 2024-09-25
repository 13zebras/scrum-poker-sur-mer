import { render, screen } from "@testing-library/react";
import NewUserDialog from "@/components/NewUserDialog";
import type { RefObject } from "react";

// TODO: Add more tests for NewUserDialog
describe("NewUserDialog", () => {
  const onSubmit = jest.fn();

  test("NewUserDialog renders properly", () => {
    const mockRef: RefObject<HTMLDialogElement> = {
      current: {
        showModal: jest.fn(),
        close: jest.fn(),
      } as unknown as HTMLDialogElement,
    };

    render(
      <NewUserDialog
        dialogRef={mockRef}
        onSubmit={onSubmit}
        displayError={false}
      />
    );
    const dialog = screen.getByRole("dialog", { hidden: true });
    expect(dialog).toBeInTheDocument();
  });
});
