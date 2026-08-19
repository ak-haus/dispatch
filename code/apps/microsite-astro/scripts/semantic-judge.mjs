// Semantic judge (ADR-0003 §Stage 4b): Claude vision judges the captured
// journey surfaces against DESIGN.md — the brand contract's primary consumer.
// REPORT-ONLY during the register-§8 calibration window (armed 2026-08-19;
// ratchets to blocking 2026-09-02). It writes a markdown report + JSON
// findings; the workflow posts the report on the PR. It never exits non-zero
// on findings — only on infrastructure failure (missing captures, API error),
// so a broken judge is visible without blocking a merge.
//
// Model pin (register §8): Sonnet-tier, pinned — pins the cost. The alias is
// the stable public ID (no date suffixes exist for it); revisit only via the
// register, never ad hoc.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

const JUDGE_MODEL = 'claude-sonnet-5';

const here = path.dirname(fileURLToPath(import.meta.url));
const appRoot = path.join(here, '..');
const repoRoot = path.join(appRoot, '..', '..', '..');
const captureDir = path.join(appRoot, 'test-results', 'judge-captures');
const outDir = path.join(appRoot, 'test-results', 'judge-report');

const designMd = fs.readFileSync(path.join(repoRoot, 'DESIGN.md'), 'utf8');

const captures = fs.existsSync(captureDir)
  ? fs.readdirSync(captureDir).filter((f) => f.endsWith('.png')).sort()
  : [];
if (captures.length === 0) {
  console.error(`semantic-judge: no captures found in ${captureDir} — run the judge capture pass first`);
  process.exit(1);
}

const FINDINGS_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['summary', 'verdict', 'findings'],
  properties: {
    summary: {
      type: 'string',
      description: 'Two or three sentences: overall fidelity of the captured surfaces to DESIGN.md.',
    },
    verdict: { type: 'string', enum: ['pass', 'findings'] },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['capture', 'rule', 'severity', 'description'],
        properties: {
          capture: { type: 'string', description: 'Capture filename the finding is visible in.' },
          rule: {
            type: 'string',
            description: 'The DESIGN.md rule or section the finding is judged against (quote the section heading or rule number).',
          },
          severity: {
            type: 'string',
            enum: ['canon-violation', 'suspect', 'note'],
            description: 'canon-violation: clearly contradicts a stated rule. suspect: likely off-canon, needs a human look. note: observation, no action implied.',
          },
          description: { type: 'string', description: 'What is wrong, where in the frame, and what the rule requires instead.' },
        },
      },
    },
  },
};

const system = [
  'You are the semantic design judge for PRIME DISpatch (dispatchmag.dev), an editorial scrollytelling microsite.',
  'You receive the brand contract (DESIGN.md — generated from the token source, the single machine-readable canon) and a set of labeled viewport screenshots of the shipped journey surfaces.',
  'Judge ONLY fidelity to the written contract: the wordmark rule (DIS always red, split markup), the 12px minimum type floor, letterpress treatment on the substrate, the palette and cycle rules, layout/stroke rules, and the Don\'ts.',
  'Do not invent taste-based findings: every finding must cite the contract rule it is judged against. If a surface is faithful, say so.',
  'Screenshots are rasterized at viewport size; small antialiasing artifacts, video-frame variance on the cover cartography, and font rasterization are NOT findings.',
  'Be precise about which capture and which region of the frame each finding refers to.',
].join(' ');

const content = [
  {
    type: 'text',
    text: `The brand contract, DESIGN.md (generated file — current truth):\n\n${designMd}`,
  },
];
for (const file of captures) {
  content.push({ type: 'text', text: `Capture: ${file}` });
  content.push({
    type: 'image',
    source: {
      type: 'base64',
      media_type: 'image/png',
      data: fs.readFileSync(path.join(captureDir, file)).toString('base64'),
    },
  });
}
content.push({
  type: 'text',
  text: 'Judge every capture against the contract and report structured findings.',
});

const client = new Anthropic();
const response = await client.messages.create({
  model: JUDGE_MODEL,
  max_tokens: 8192,
  system,
  output_config: { format: { type: 'json_schema', schema: FINDINGS_SCHEMA } },
  messages: [{ role: 'user', content }],
});

if (response.stop_reason === 'refusal') {
  console.error('semantic-judge: the judge model refused the request — treat as infrastructure failure');
  process.exit(1);
}
const textBlock = response.content.find((b) => b.type === 'text');
if (!textBlock) {
  console.error('semantic-judge: no text block in the response');
  process.exit(1);
}
const report = JSON.parse(textBlock.text);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'findings.json'), JSON.stringify(report, null, 2));

const sevIcon = { 'canon-violation': '🟥', suspect: '🟨', note: '▫️' };
const lines = [
  '## Semantic design judge — report-only',
  '',
  `> ADR-0003 §Stage 4b · model \`${response.model}\` · ${captures.length} captures · calibration window ends **2026-09-02** (then this lane ratchets to blocking).`,
  '',
  report.summary,
  '',
];
if (report.findings.length === 0) {
  lines.push('No findings — every captured surface reads faithful to DESIGN.md.');
} else {
  lines.push('| | Capture | Rule | Finding |', '|---|---|---|---|');
  for (const f of report.findings) {
    lines.push(`| ${sevIcon[f.severity] ?? '▫️'} | \`${f.capture}\` | ${f.rule} | ${f.description} |`);
  }
  lines.push('', '_Report-only: findings file a review, never block this merge. A wrong pixel files a board row, never an inline fix._');
}
fs.writeFileSync(path.join(outDir, 'report.md'), lines.join('\n'));

console.log(`semantic-judge: ${report.verdict} — ${report.findings.length} finding(s); report at ${path.join(outDir, 'report.md')}`);
console.log(
  `semantic-judge: usage in=${response.usage.input_tokens} out=${response.usage.output_tokens}`,
);
