import {
  useState,
  useRef,
  useEffect,
  type ReactElement,
  type ReactNode,
  type FormEvent,
} from "react";
import { clsx } from "clsx";

/**
 * VirgilChat — in-page Virgil chatbot (Inferno-guide; production opt-in).
 *
 * Canon: representation/visual-system/components/VirgilChat/spec.md
 *  + CD4 §3.1 #19 + CD1 Concept 7 (Virgil = Dante's guide; thematic
 *  cosmology coupling) + master plan §11 Q8 production opt-in.
 *
 * Shell-level component: renders chat surface (turn list + input).
 * Streaming + AI orchestration (CrewAI / LangGraph per master plan §1.4.2)
 * is app-level wiring; this component receives turns + onSend handler.
 *
 * Per-turn typography per CD4 §3.1 #19 marriage-of-registers:
 *   - user prose      → Body serif (NARRATIVE)
 *   - virgil prose    → Body serif (NARRATIVE)
 *   - virgil code     → Meta-code monospace (META)
 *   - system metadata → Nav sans tracked-out (chrome)
 */

export type VirgilChatTurn = {
  id: string;
  /** Speaker — "user" (you) or "virgil" (the guide) or "system" */
  speaker: "user" | "virgil" | "system";
  /** Turn body — string for prose; ReactNode allows code-block composition */
  body: ReactNode;
  /** Timestamp */
  at: Date | string;
  /** Whether this turn is currently streaming (renders typing indicator) */
  streaming?: boolean;
};

export type VirgilChatProps = {
  /** Turns ordered chronologically (oldest first) */
  turns: VirgilChatTurn[];
  /** Submit handler — host calls AI backend */
  onSend: (input: string) => void | Promise<void>;
  /** Whether send is currently disabled (e.g., during streaming) */
  isSending?: boolean;
  /** Placeholder for the input */
  placeholder?: string;
  /** Optional label for the chat region */
  ariaLabel?: string;
  /** Optional empty-state message */
  emptyMessage?: string;
  className?: string;
};

export function VirgilChat(props: VirgilChatProps): ReactElement {
  const {
    turns,
    onSend,
    isSending = false,
    placeholder = "Ask Virgil…",
    ariaLabel = "Virgil chat",
    emptyMessage = "Virgil is the guide. Ask anything about the dispatch.",
    className,
  } = props;

  const [input, setInput] = useState("");
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [turns.length]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isSending) return;
    setInput("");
    await onSend(trimmed);
  }

  return (
    <section
      className={clsx("prime-virgil-chat", className)}
      aria-label={ariaLabel}
    >
      <div
        ref={scrollerRef}
        className="prime-virgil-chat__scroller"
        role="log"
        aria-live="polite"
        aria-relevant="additions"
      >
        {turns.length === 0 ? (
          <p className="prime-virgil-chat__empty">{emptyMessage}</p>
        ) : (
          <ol className="prime-virgil-chat__turns">
            {turns.map((turn) => (
              <li
                key={turn.id}
                className={clsx(
                  "prime-virgil-chat__turn",
                  `prime-virgil-chat__turn--${turn.speaker}`,
                  turn.streaming && "prime-virgil-chat__turn--streaming",
                )}
              >
                <span
                  className="prime-virgil-chat__speaker"
                  aria-label={`${turn.speaker} said:`}
                >
                  {turn.speaker === "user"
                    ? "You"
                    : turn.speaker === "virgil"
                      ? "Virgil"
                      : "System"}
                </span>
                <div className="prime-virgil-chat__body">{turn.body}</div>
                {turn.streaming ? (
                  <span
                    className="prime-virgil-chat__indicator"
                    aria-label="Virgil is responding"
                  >
                    …
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        )}
      </div>
      <form className="prime-virgil-chat__form" onSubmit={handleSubmit}>
        <label
          htmlFor="prime-virgil-chat-input"
          className="prime-virgil-chat__label"
        >
          Message Virgil
        </label>
        <textarea
          id="prime-virgil-chat-input"
          className="prime-virgil-chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={placeholder}
          rows={2}
          disabled={isSending}
        />
        <button
          type="submit"
          className="prime-virgil-chat__send"
          disabled={isSending || input.trim().length === 0}
          aria-label="Send message"
        >
          {isSending ? "Sending…" : "Send"}
        </button>
      </form>
    </section>
  );
}
