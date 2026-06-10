import { useForm, type DefaultValues, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodTypeAny, z } from "zod";

/**
 * Type-safe form hook wired to a Zod schema.
 *
 * Production-grade pattern:
 *   - Schema IS the type — `z.infer<TSchema>` flows into form values
 *   - Validation happens at the boundary; component receives parsed/typed data
 *   - One source of truth for validation rules (the Zod schema), shared by
 *     server (Astro Endpoints / Next Server Actions) + client (this hook)
 *
 * Usage:
 *   const schema = z.object({ email: z.string().email(), age: z.number().int().positive() });
 *   const form = useSchemaForm(schema, { defaultValues: { age: 18 } });
 *   form.register("email"); // typed
 *   form.handleSubmit((values) => { ... }); // values: { email: string; age: number }
 */
export function useSchemaForm<TSchema extends ZodTypeAny>(
  schema: TSchema,
  options?: {
    defaultValues?: DefaultValues<z.infer<TSchema>>;
    mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  },
): UseFormReturn<z.infer<TSchema>> {
  const form = useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues: options?.defaultValues,
    mode: options?.mode ?? "onSubmit",
  });

  // RHF Proxy subscription: formState is a lazy Proxy that subscribes
  // ONLY to fields touched during render. Touching `errors` here ensures
  // `formState.errors` stays in sync after submit/trigger calls. Without
  // this, consumers who only read errors AFTER submit will see stale {}.
  // See: react-hook-form.com/docs/useform/formstate (Subscribe to errors)
  // Ignored void to satisfy strict-typing; the property access is the point.
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  form.formState.errors;

  return form;
}
