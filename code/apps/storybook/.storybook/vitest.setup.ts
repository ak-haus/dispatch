/**
 * Project-annotation bridge for the story-test rail: every story test renders
 * with the SAME preview context the Storybook app uses (tokens.css import,
 * cycle decorator, a11y parameters) — the test is the story, not a parallel
 * fixture (Storybook AI guidance: verify stories with story tests).
 */
import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/react-vite";
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import * as projectAnnotations from "./preview";

const annotations = setProjectAnnotations([
  a11yAddonAnnotations,
  projectAnnotations,
]);

beforeAll(annotations.beforeAll);
