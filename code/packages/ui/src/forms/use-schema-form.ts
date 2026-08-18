import { useForm, type DefaultValues, type FieldValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from "zod";

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
 *   const schema = z.object({ email: z.email(), age: z.number().int().positive() });
 *   const form = useSchemaForm(schema, { defaultValues: { age: 18 } });
 *   form.register("email"); // typed
 *   form.handleSubmit((values) => { ... }); // values: { email: string; age: number }
 */
export function useSchemaForm<TSchema extends z.ZodType<FieldValues, FieldValues>>(
  schema: TSchema,
  options?: {
    defaultValues?: DefaultValues<z.input<TSchema>>;
    mode?: "onChange" | "onBlur" | "onSubmit" | "onTouched" | "all";
  },
) {
  // Zod 4 schemas carry distinct input/output types (transforms). RHF's
  // three generics thread them: raw form state is the schema INPUT; the
  // values handed to a valid submit are the parsed OUTPUT.
  // Boundary cast: over a GENERIC ZodType, zodResolver's inference collapses
  // Input to plain FieldValues, which useForm's invariant ResolverOptions
  // rejects. Concrete schemas at call sites infer exactly; the runtime
  // contract is pinned by use-schema-form.test.tsx.
  const resolver = zodResolver(schema) as unknown as Resolver<
    z.input<TSchema>,
    unknown,
    z.output<TSchema>
  >;
  const form = useForm<z.input<TSchema>, unknown, z.output<TSchema>>({
    resolver,
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
