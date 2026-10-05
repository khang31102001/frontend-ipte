import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ApiError } from "@/core/api";
import { emailString, requiredString, z } from "@/core/validation";
import { Form, FormActions, applyServerErrors, createFormFields, useEntityForm } from "./index";

const schema = z.object({
  fullName: requiredString("Vui lòng nhập họ tên"),
  email: emailString(),
  age: z.number({ error: "Tuổi phải là số" }).int().min(10, "Tối thiểu 10").optional(),
  tags: z.array(z.string()).default([]),
});
type Values = z.input<typeof schema>;
const F = createFormFields<Values>();

function Harness({
  create,
  onSaved,
}: {
  create: (v: z.output<typeof schema>) => Promise<{ id: string }>;
  onSaved?: (r: { id: string }) => void;
}) {
  const { form, onSubmit, isSubmitting } = useEntityForm<typeof schema, { id: string }, { id: string }>({
    schema,
    defaults: { fullName: "", email: "", age: undefined, tags: [] },
    create,
    onSaved,
  });
  return (
    <Form form={form} onSubmit={onSubmit}>
      <F.Input name="fullName" label="Họ tên" required />
      <F.Input name="email" label="Email" />
      <F.Input name="age" label="Tuổi" type="number" numeric />
      <F.Tags name="tags" label="Tag" />
      <FormActions submitting={isSubmitting} submitLabel="Gửi" />
    </Form>
  );
}

describe("form (react-hook-form + zod)", () => {
  it("hiển thị lỗi zod theo từng field và không gọi create khi chưa hợp lệ", async () => {
    const create = vi.fn(async () => ({ id: "1" }));
    render(<Harness create={create} />);
    await userEvent.click(screen.getByRole("button", { name: "Gửi" }));
    expect(await screen.findByText("Vui lòng nhập họ tên")).toBeInTheDocument();
    expect(screen.getByText("Không được để trống")).toBeInTheDocument(); // email rỗng
    expect(create).not.toHaveBeenCalled();

    // Email sai định dạng: thông báo riêng
    await userEvent.type(screen.getByLabelText("Email"), "abc");
    await userEvent.click(screen.getByRole("button", { name: "Gửi" }));
    expect(await screen.findByText("Email không hợp lệ")).toBeInTheDocument();
  });

  it("submit hợp lệ: chuyển số/chuỗi/tag đúng kiểu rồi gọi create và onSaved", async () => {
    const create = vi.fn(async (_v: z.output<typeof schema>) => ({ id: "99" }));
    const onSaved = vi.fn();
    render(<Harness create={create} onSaved={onSaved} />);
    await userEvent.type(screen.getByLabelText(/Họ tên/), "Nguyễn An");
    await userEvent.type(screen.getByLabelText("Email"), "an@example.com");
    await userEvent.type(screen.getByLabelText("Tuổi"), "25");
    await userEvent.type(screen.getByLabelText("Tag"), "VIP, Cần gọi lại");
    await userEvent.click(screen.getByRole("button", { name: "Gửi" }));

    await waitFor(() => expect(create).toHaveBeenCalledTimes(1));
    expect(create.mock.calls[0]?.[0]).toEqual({ fullName: "Nguyễn An", email: "an@example.com", age: 25, tags: ["VIP", "Cần gọi lại"] });
    await waitFor(() => expect(onSaved).toHaveBeenCalledWith({ id: "99" }));
  });

  it("đổ lỗi validation 422 của server vào đúng field (applyServerErrors)", async () => {
    const create = vi.fn(async () => {
      throw new ApiError({
        message: "Dữ liệu không hợp lệ",
        status: 422,
        code: "VALIDATION_ERROR",
        errors: [{ field: "email", message: "Email đã tồn tại" }],
      });
    });
    render(<Harness create={create} />);
    await userEvent.type(screen.getByLabelText(/Họ tên/), "An");
    await userEvent.type(screen.getByLabelText("Email"), "an@example.com");
    await userEvent.click(screen.getByRole("button", { name: "Gửi" }));
    expect(await screen.findByText("Email đã tồn tại")).toBeInTheDocument();
  });

  it("applyServerErrors trả false với lỗi không phải validation", () => {
    const form = { setError: vi.fn() } as never;
    expect(applyServerErrors(form, new ApiError({ message: "x", status: 500, code: "SERVER_ERROR" }))).toBe(false);
    expect(applyServerErrors(form, new Error("x"))).toBe(false);
  });
});
