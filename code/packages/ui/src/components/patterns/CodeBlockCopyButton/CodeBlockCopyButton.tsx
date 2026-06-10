import { useState, type ReactElement } from "react";
import { clsx } from "clsx";
import { toast } from "../../ui";
import { Copy, Check } from "../../../utils";

/**
 * CodeBlockCopyButton — copy-to-clipboard affordance on code blocks.
 *
 * Canon: representation/visual-system/components/CodeBlockCopyButton/spec.md
 *  + CD4 §3.1 #6 + CD1 Concept 1 5-typeface containment (Meta-code slot
 *  component-locked).
 *
 * Renders a `<pre><code>` block with a top-right copy button. Uses
 * clipboard API + sonner toast confirmation. Hides automatically on touch
 * devices (no hover affordance possible) by relying on focus-visible.
 */

export type CodeBlockCopyButtonProps = {
  /** Code source (rendered as-is; pre-highlighted HTML can be passed via dangerouslySetInnerHTML alternative) */
  code: string;
  /** Language label rendered in the META band */
  language?: string;
  /** Optional file name for the band */
  filename?: string;
  /** Toast message override */
  successMessage?: string;
  /** Class hook */
  className?: string;
};

export function CodeBlockCopyButton(
  props: CodeBlockCopyButtonProps,
): ReactElement {
  const {
    code,
    language,
    filename,
    successMessage = "Copied to clipboard",
    className,
  } = props;

  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        toast.success(successMessage);
        setTimeout(() => setCopied(false), 1500);
      }
    } catch (err) {
      toast.error("Copy failed — select + copy manually.");
    }
  }

  return (
    <figure className={clsx("prime-code-block", className)}>
      {(language || filename) && (
        <figcaption className="prime-code-block__band">
          {filename ? (
            <span className="prime-code-block__filename">{filename}</span>
          ) : null}
          {language ? (
            <span className="prime-code-block__language">{language}</span>
          ) : null}
        </figcaption>
      )}
      <pre className="prime-code-block__pre">
        <code className="prime-code-block__code">{code}</code>
      </pre>
      <button
        type="button"
        className={clsx(
          "prime-code-block__copy",
          copied && "prime-code-block__copy--copied",
        )}
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code to clipboard"}
      >
        {copied ? (
          <Check size={16} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <Copy size={16} strokeWidth={1.5} aria-hidden="true" />
        )}
        <span className="prime-code-block__copy-label">
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    </figure>
  );
}
