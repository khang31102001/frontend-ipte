import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ConfirmDialog } from "./confirm-dialog";
import { Modal } from "./modal";

describe("<Modal />", () => {
  it("không render khi đóng; render role=dialog có tiêu đề khi mở", () => {
    const { rerender } = render(
      <Modal open={false} onClose={() => undefined} title="Tiêu đề">
        Nội dung
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    rerender(
      <Modal open onClose={() => undefined} title="Tiêu đề">
        Nội dung
      </Modal>,
    );
    expect(screen.getByRole("dialog", { name: "Tiêu đề" })).toBeInTheDocument();
    expect(screen.getByText("Nội dung")).toBeInTheDocument();
  });

  it("đóng bằng phím Escape, nút đóng và bấm nền", async () => {
    const onClose = vi.fn();
    render(
      <Modal open onClose={onClose} title="Hộp thoại">
        <button>Trong hộp</button>
      </Modal>,
    );
    await userEvent.keyboard("{Escape}");
    await userEvent.click(screen.getByRole("button", { name: "Đóng" }));
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it("đưa focus vào hộp thoại, giữ focus trong hộp (Tab vòng) và khóa cuộn nền", async () => {
    render(
      <Modal open onClose={() => undefined} title="Hộp thoại">
        <input aria-label="ô nhập" />
      </Modal>,
    );
    expect(document.body.style.overflow).toBe("hidden");
    const dialog = screen.getByRole("dialog");
    expect(dialog.contains(document.activeElement)).toBe(true);
    for (let i = 0; i < 6; i++) await userEvent.tab();
    expect(dialog.contains(document.activeElement)).toBe(true);
  });
});

describe("<ConfirmDialog />", () => {
  it("gọi onConfirm/onCancel đúng nút; loading vô hiệu nút hủy", async () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();
    const { rerender } = render(<ConfirmDialog open title="Xóa học viên?" description="Không thể hoàn tác" confirmLabel="Xóa" destructive onConfirm={onConfirm} onCancel={onCancel} />);
    await userEvent.click(screen.getByRole("button", { name: "Xóa" }));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    await userEvent.click(screen.getByRole("button", { name: "Hủy" }));
    expect(onCancel).toHaveBeenCalledTimes(1);

    rerender(<ConfirmDialog open loading title="Xóa học viên?" confirmLabel="Xóa" onConfirm={onConfirm} onCancel={onCancel} />);
    expect(screen.getByRole("button", { name: "Hủy" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Xóa" })).toBeDisabled();
  });
});
