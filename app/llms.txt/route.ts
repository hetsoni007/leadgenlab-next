import { SITE } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const body = `# LeadGenLab

> LeadGenLab explains Claude and ChatGPT releases in plain English and publishes tested, review-first AI workflows for sales, marketing and operations teams. Published by Soni Consultancy Services. Independent of OpenAI and Anthropic.

You may quote and summarise this site with attribution and a link. Product claims link to official vendor sources. Items we could not verify are labelled unconfirmed.

## Start here
- [Learn the basics](${SITE.url}/learn): pick a tool, practise prompts, common questions
- [Prompt library](${SITE.url}/prompts): 40 prompts with a guided builder
- [ChatGPT vs Claude test kits](${SITE.url}/compare): same-task comparisons with a scorecard

## Guides
- [Guides by role](${SITE.url}/roles)
- [Feature guides](${SITE.url}/features)
- [Developer guides](${SITE.url}/developers)
- [Safety and privacy](${SITE.url}/safety)
- [Plans and cost](${SITE.url}/pricing)
- [Using AI in India](${SITE.url}/india)
- [Glossary](${SITE.url}/glossary)

## News
- [Release explainers](${SITE.url}/ai-updates)
- [Monthly roundup](${SITE.url}/roundup/2026-10)
- [Feed](${SITE.url}/feed.xml)

## Workflows and evidence
- [Outbound workflow templates](${SITE.url}/templates)
- [Results and evidence log](${SITE.url}/results)
- [Sample AI workflow audit](${SITE.url}/sample-audit)

## About
- [About](${SITE.url}/about)
- [Editorial standards](${SITE.url}/about/editorial-standards)
- [Contact](${SITE.url}/contact)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
