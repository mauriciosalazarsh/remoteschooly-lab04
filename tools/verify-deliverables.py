"""Cross-check architecture, sequences, local links and exported PDFs. Run from repo root."""
import json
import re
from pathlib import Path
from collections import Counter
root=Path(__file__).resolve().parents[1]
a=json.loads((root/'Diagramas/arquitectura.architecture.json').read_text())
ids=[c['id'] for c in a['components']]
assert len(ids)==len(set(ids)), 'Duplicate component IDs'
edges={(e['from'],e['to']) for e in a['connections']}
for f,t in edges: assert f in ids and t in ids,(f,t)
counts=Counter(c['type'] for c in a['components'])
print('Architecture:', dict(counts), 'services:', counts['backend']+counts['security'])
for p in sorted((root/'Diagramas').glob('*.sequence.json')):
 d=json.loads(p.read_text()); participants={c['id'] for c in d['participants']}
 assert participants<=set(ids),(p,participants-set(ids))
 assert len({m['id'] for m in d['messages']})==len(d['messages'])
 for m in d['messages']:
  pair=(m['from'],m['to']);assert set(pair)<=participants,(p,m)
  assert pair in edges or (m.get('variant')=='return' and pair[::-1] in edges),(p.name,m['id'],pair)
 print(p.name, len(d['messages']), 'messages mapped to architecture')
for p in root.rglob('*.md'):
 if '.git' in p.parts:continue
 for target in re.findall(r'!?\[[^\]]*\]\(([^\s)]+)\)',p.read_text()):
  if '://' in target or target.startswith(('#','mailto:')):continue
  target=target.split('#')[0]
  assert (p.parent/target).exists(),f'Broken link in {p.relative_to(root)}: {target}'
from pypdf import PdfReader
for p in sorted((root/'Diagramas').glob('*.pdf')):
 reader=PdfReader(p); assert len(reader.pages)==1,(p,'Unexpected page count')
 txt=reader.pages[0].extract_text();assert len(txt)>500,(p,'PDF has no selectable text')
 assert 'RemoteSchooly' in txt,(p,'Missing title')
 assert p.with_suffix('.png').exists()
 print(p.name,'1 page;',len(txt),'text characters')
assert 14*32768/50_000_000<0.01
assert round((1-164.16/702)*100,1)==76.6
print('PASS: references, sequence dependencies, PDF text, download bound and savings arithmetic')
