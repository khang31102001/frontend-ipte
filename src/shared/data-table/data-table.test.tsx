import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApiError } from "@/core/api";
import { DataTable, type Column } from "./data-table";

interface Row {
  id: string;
  name: string;
}
const columns: Column<Row>[] = [
  { key: "name", header: "Tên", sortKey: "name", cell: (r) => r.name },
  { key: "id", header: "Mã", cell: (r) => r.id },
];
const rows: Row[] = [
  { id: "a1", name: "An" },
  { id: "b2", name: "Bình" },
];

describe("<DataTable />", () => {
  it("hiển thị dòng dữ liệu và caption", () => {
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} caption="Danh sách" />);
    expect(screen.getByText("An")).toBeInTheDocument();
    expect(screen.getByText("Bình")).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveAccessibleName("Danh sách");
  });

  it("trạng thái loading hiển thị skeleton, không hiển thị dữ liệu", () => {
    const { container } = render(<DataTable columns={columns} rows={undefined} isLoading getRowKey={(r) => r.id} />);
    expect(container.querySelectorAll("tbody tr[aria-hidden]").length).toBeGreaterThan(0);
    expect(screen.queryByText("An")).not.toBeInTheDocument();
  });

  it("trạng thái rỗng dùng tiêu đề và hành động tùy biến", () => {
    render(<DataTable columns={columns} rows={[]} getRowKey={(r) => r.id} emptyTitle="Chưa có học viên" emptyAction={<button>Thêm</button>} />);
    expect(screen.getByText("Chưa có học viên")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Thêm" })).toBeInTheDocument();
  });

  it("trạng thái lỗi hiển thị thông báo của ApiError và gọi onRetry", async () => {
    const onRetry = vi.fn();
    const error = new ApiError({ message: "Máy chủ đang bảo trì", status: 500, code: "SERVER_ERROR" });
    render(<DataTable columns={columns} rows={undefined} error={error} onRetry={onRetry} getRowKey={(r) => r.id} />);
    expect(screen.getByText("Máy chủ đang bảo trì")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: /thử lại/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("bấm tiêu đề cột sắp xếp được: asc rồi desc; aria-sort phản ánh trạng thái", async () => {
    const onSortChange = vi.fn();
    const { rerender } = render(
      <DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} sort={{}} onSortChange={onSortChange} />,
    );
    await userEvent.click(screen.getByRole("button", { name: /tên/i }));
    expect(onSortChange).toHaveBeenLastCalledWith("name", "asc");

    rerender(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} sort={{ sortBy: "name", sortOrder: "asc" }} onSortChange={onSortChange} />);
    expect(screen.getByRole("columnheader", { name: /tên/i })).toHaveAttribute("aria-sort", "ascending");
    await userEvent.click(screen.getByRole("button", { name: /tên/i }));
    expect(onSortChange).toHaveBeenLastCalledWith("name", "desc");
  });

  it("phân trang: hiển thị khoảng dòng, chuyển trang và đổi cỡ trang", async () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <DataTable
        columns={columns}
        rows={rows}
        getRowKey={(r) => r.id}
        meta={{ page: 2, pageSize: 10, total: 35, totalPages: 4 }}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />,
    );
    expect(screen.getByText("11–20 / 35")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button", { name: "Trang sau" }));
    expect(onPageChange).toHaveBeenLastCalledWith(3);
    await userEvent.click(screen.getByRole("button", { name: "Trang đầu" }));
    expect(onPageChange).toHaveBeenLastCalledWith(1);
    await userEvent.selectOptions(screen.getByRole("combobox"), "50");
    expect(onPageSizeChange).toHaveBeenCalledWith(50);
  });

  it("nút trang trước/đầu bị vô hiệu ở trang 1", () => {
    render(<DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} meta={{ page: 1, pageSize: 10, total: 25, totalPages: 3 }} onPageChange={() => undefined} />);
    expect(screen.getByRole("button", { name: "Trang trước" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Trang đầu" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Trang sau" })).toBeEnabled();
  });

  it("rowActions không kích hoạt onRowClick", async () => {
    const onRowClick = vi.fn();
    const onAction = vi.fn();
    render(
      <DataTable columns={columns} rows={rows} getRowKey={(r) => r.id} onRowClick={onRowClick} rowActions={(r) => <button onClick={() => onAction(r.id)}>Sửa {r.name}</button>} />,
    );
    const row = screen.getByText("An").closest("tr") as HTMLElement;
    await userEvent.click(within(row).getByRole("button", { name: "Sửa An" }));
    expect(onAction).toHaveBeenCalledWith("a1");
    expect(onRowClick).not.toHaveBeenCalled();
    await userEvent.click(screen.getByText("Bình"));
    expect(onRowClick).toHaveBeenCalledWith(rows[1]);
  });
});
