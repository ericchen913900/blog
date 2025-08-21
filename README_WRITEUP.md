How to add a new CTF writeup

Quick steps:
1. Create a new file under `src/pages/writeups/` named `your-slug.astro`.
2. Import the layout and `WriteupTemplate`:

---
import Layout from '../../layouts/Layout.astro';
import WriteupTemplate from '../../components/WriteupTemplate.astro';
---

3. Use the template slots:

<Layout>
  <WriteupTemplate>
    <span slot="title">Your challenge title</span>
    <span slot="meta">Category · Difficulty · Date</span>
    <!-- body content here -->
    <span slot="footer">Attribution / notes</span>
  </WriteupTemplate>
</Layout>

Notes:
- Keep sensitive exploit code out of public posts; redact PoC payloads and provide guidance to run in authorized labs.
- For code blocks, use fenced <pre class="language-xxx"> blocks and ensure you do not leak secrets.
