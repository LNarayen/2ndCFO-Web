# Messaging claim audit — October 28, 2026 Pacific

Production website repository: LNarayen/2ndCFO-Web, baseline 64f9063.
Product reference inspected read-only: local SmartBooks checkout, HEAD fbefc0a.

## Evidence and limits

The referenced Social Media Recommendations conversation was retrieved. Its five user turns were readable; assistant turns were reference placeholders and there was no older cursor. The current request supplies the positioning and five problem areas. No claim of reading the unavailable assistant prose is made.

Current implementation evidence supports a deliberately narrow product description. Local implementation is evidence of capability, not proof that every production workflow or service is operational. No customer financial data, credentials, or production databases were accessed. No claim of a live product acceptance test is made.

| Public claim | Implementation evidence | Editorial decision |
| --- | --- | --- |
| Bank/card CSV imports | SmartBooks src/modules/imports/csv.ts, normalize.ts, persist.ts; import fixtures and e2e/import-account-selection.spec.ts | Describe CSV imports; do not imply bank feeds or universal integrations. |
| Source-linked records | src/modules/transactions/detail.ts exposes importFileId/importRowId; src/modules/imports/source-detail.ts | Describe traceability, without guaranteeing record completeness or accuracy. |
| Reviewed categories and confirmed rules | src/modules/transactions/categorize.ts; src/modules/categorization/rules.ts; user in Explain 2ndCFO Codebase states AI classification was rejected for V1 | Describe confirmed rules and manual review; no autonomous AI classification promise. |
| Recorded income, outflows, category spending | src/modules/analytics/analytics.ts: totals, revenueTotal, operatingExpenseTotal, spendByCategory | Limit analysis to available imported records and reporting period; cash movement is not profit or live cash balance. |
| Supported transaction questions | src/modules/financial-tools/tools/get-category-spending.ts and registry.ts | Restrict to supported questions; no unlimited answers, causal certainty, or financial advice. |
| Reconciliation, monthly close, formal statements | architecture/00-mvp-scope.md explicitly defers reconciliation; no operational service delivery evidence | Proposed service scope requires confirmation. Do not describe import as reconciled books. |
| Automated alerts, 24/7 monitoring, real-time insights | No current implementation evidence; insights engine/background jobs deferred in MVP scope | Remove promises and Live badge. |
| Forecasting, scenarios, CFO responsibility | Not established as working product or operating service | Separate discussion and availability confirmation; no current software or full CFO promise. |
| Margin/job/matter/technician reporting | No verified full operating-data workflow | Educational examples and input requirements only; no automatic industry reporting promise. |
| Guaranteed returns, savings, profits, refund and response guarantees | No operational evidence | Remove profit/savings outcomes, refund guarantee and fixed response times. |
| QuickBooks publishing, universal data connections, absolute security claims | No verified operational evidence | Remove guarantees; discuss handoffs and confidentiality before sharing records. |
| Starting prices, month-to-month terms, founder history and geography | Existing published business facts, not changed or newly independently verified | Preserve factual details as requested. Prices are presented as subject to scope/availability, not proof of service readiness. |

## Preservation and verification

Homepage hero: “Do What You Love. Build a Stronger Business.”
All six service/industry route headings and introductions aligned; each includes a source-record foundation and explicitly labeled illustrative example. Existing substantive educational content retained.
Homepage hash views aligned for services, industries, pricing, and contact; founder story preserved except discovery-fit certainty and shared footer language.
Published titles, descriptions, Open Graph data, canonical tags, sitemap and robots retained. Navigation assets/template unchanged. Form fields and submission JavaScript unchanged; no test inquiry sent.

Browser/build/production results are recorded in verification/messaging-results.json and the completion report after validation.
