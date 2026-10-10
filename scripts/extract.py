"""Extract page content from the legacy static LeadGenLab site into content/pages.json."""
import json, re, subprocess, sys
from pathlib import Path
from bs4 import BeautifulSoup, Comment

SRC = Path(sys.argv[1]).expanduser()
OUT = Path(__file__).resolve().parent.parent / "content" / "pages.json"
DROP_CLASSES = {"workflow-demo", "role-lab", "route-thread", "consult-bridge", "skip-link",
                "demo-topline", "newsletter", "finder", "tool-finder", "flow-presets"}
KEEP_ATTRS = {"href", "src", "alt", "rel", "target", "id", "colspan", "rowspan", "datetime", "class"}
KEEP_CLASSES = {"callout", "source-link", "example-flow", "example-node", "story-visual", "update-stamp", "visual-caption"}

pages = []
for f in sorted(SRC.rglob("*.html")):
    rel = f.relative_to(SRC)
    if ".git" in rel.parts or rel.name == "404.html":
        continue
    soup = BeautifulSoup(f.read_text(), "html.parser")
    main = soup.find("main") or soup.body
    if main is None:
        continue
    for t in main.find_all(["script", "style", "form", "nav", "button", "select", "input", "textarea", "svg", "noscript"]):
        t.decompose()
    for t in main.find_all(True):
        if t.decomposed if hasattr(t, "decomposed") else False:
            continue
        cls = set(t.get("class", []))
        if cls & DROP_CLASSES or t.has_attr("data-workflow-demo") or t.has_attr("data-role-lab"):
            t.decompose()
    for c in main.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()
    h1 = main.find("h1")
    title = h1.get_text(" ", strip=True) if h1 else (soup.title.get_text(strip=True).split("|")[0].strip() if soup.title else rel.stem)
    if h1:
        # hero wrapper: take intro paragraph, then remove whole hero from body
        hero = h1.find_parent("section") or h1.parent
        intro_el = hero.find("p")
        intro = intro_el.get_text(" ", strip=True) if intro_el else ""
        hero.decompose()
    else:
        intro = ""
    md = soup.find("meta", attrs={"name": "description"})
    description = (md.get("content", "") if md else "") or intro
    eyebrow = ""
    # drop a leading h2 that just repeats the page title
    first = main.find("h2")
    if first and first.get_text(" ", strip=True).lower() == title.lower():
        first.decompose()
    for t in main.find_all(True):
        t.attrs = {k: v for k, v in t.attrs.items() if k in KEEP_ATTRS}
        if "class" in t.attrs:
            keep = [c for c in t.attrs["class"] if c in KEEP_CLASSES]
            if keep:
                t.attrs["class"] = keep
            else:
                del t.attrs["class"]
    seen = {}
    for h in main.find_all(["h2", "h3"]):
        base = re.sub(r"[^a-z0-9]+", "-", h.get_text(" ", strip=True).lower()).strip("-")[:48] or "section"
        seen[base] = seen.get(base, 0) + 1
        h["id"] = base if seen[base] == 1 else f"{base}-{seen[base]}"
    html = re.sub(r"\s+", " ", main.decode_contents()).strip()
    parts = list(rel.parts)
    if parts[-1] == "index.html":
        parts = parts[:-1]
    else:
        parts[-1] = parts[-1][:-5]
    pages.append({
        "path": "/" + "/".join(parts),
        "section": parts[0] if parts else "home",
        "title": title,
        "description": description[:300],
        "intro": intro,
        "html": html,
        "legacy": "/" + str(rel),
    })
OUT.write_text(json.dumps(pages, indent=1, ensure_ascii=False))
print(len(pages), "pages ->", OUT)
for p in pages:
    print(f'{p["path"]:70} {len(p["html"]):>6}  {p["title"][:50]}')
