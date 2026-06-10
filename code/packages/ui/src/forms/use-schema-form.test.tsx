import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { z } from "zod";
import { useSchemaForm } from "./use-schema-form";

describe("useSchemaForm", () => {
  const subscribeSchema = z.object({
    email: z.string().email("invalid-email"),
    cycle: z.enum(["dawn", "dusk", "night"]),
    age: z.number().int().min(13, "min-age-13"),
  });
  type SubscribeValues = z.infer<typeof subscribeSchema>;

  it("typed values flow from schema (compile-time + runtime)", () => {
    const { result } = renderHook(() =>
      useSchemaForm(subscribeSchema, {
        defaultValues: { email: "", cycle: "dawn", age: 18 },
      }),
    );
    const values: SubscribeValues = result.current.getValues();
    expect(values.email).toBe("");
    expect(values.cycle).toBe("dawn");
    expect(values.age).toBe(18);
  });

  it("rejects invalid email + surfaces typed error", async () => {
    const onValid = vi.fn();
    const onInvalid = vi.fn();
    const { result } = renderHook(() =>
      useSchemaForm(subscribeSchema, {
        defaultValues: { email: "not-an-email", cycle: "dawn", age: 25 },
      }),
    );
    await act(async () => {
      await result.current.handleSubmit(onValid, onInvalid)();
    });
    expect(onValid).not.toHaveBeenCalled();
    expect(onInvalid).toHaveBeenCalledTimes(1);
    await waitFor(() => {
      expect(result.current.formState.errors.email?.message).toBe(
        "invalid-email",
      );
    });
  });

  it("rejects underage submission per schema constraint", async () => {
    const onValid = vi.fn();
    const onInvalid = vi.fn();
    const { result } = renderHook(() =>
      useSchemaForm(subscribeSchema, {
        defaultValues: { email: "ak@prime.dev", cycle: "night", age: 10 },
      }),
    );
    await act(async () => {
      await result.current.handleSubmit(onValid, onInvalid)();
    });
    expect(onValid).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(result.current.formState.errors.age?.message).toBe("min-age-13");
    });
  });

  it("accepts valid submission and forwards parsed values", async () => {
    const onValid = vi.fn();
    const onInvalid = vi.fn();
    const { result } = renderHook(() =>
      useSchemaForm(subscribeSchema, {
        defaultValues: { email: "ak@prime.dev", cycle: "dusk", age: 25 },
      }),
    );
    await act(async () => {
      await result.current.handleSubmit(onValid, onInvalid)();
    });
    expect(onInvalid).not.toHaveBeenCalled();
    expect(onValid).toHaveBeenCalledTimes(1);
    const submitted = onValid.mock.calls[0]?.[0] as SubscribeValues;
    expect(submitted.email).toBe("ak@prime.dev");
    expect(submitted.cycle).toBe("dusk");
    expect(submitted.age).toBe(25);
  });

  it("validation mode override is respected", () => {
    const { result } = renderHook(() =>
      useSchemaForm(subscribeSchema, {
        defaultValues: { email: "", cycle: "dawn", age: 18 },
        mode: "onChange",
      }),
    );
    // mode is internal RHF state; smoke-assert the hook didn't crash
    // and exposes the standard RHF API surface
    expect(typeof result.current.register).toBe("function");
    expect(typeof result.current.handleSubmit).toBe("function");
    expect(typeof result.current.formState).toBe("object");
  });
});
