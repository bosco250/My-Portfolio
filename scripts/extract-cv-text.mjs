/**
 * Decompresses the rendered PDF's content streams and pulls out the text, which
 * is the same thing an applicant tracking system does. If phrases show up here,
 * a parser can read them.
 */
import { readFile } from 'node:fs/promises'
import { inflateSync } from 'node:zlib'

const buf = await readFile('tmp/cv-check.pdf')
const raw = buf.toString('latin1')

let extracted = ''
const re = /stream\r?\n/g
let m

while ((m = re.exec(raw)) !== null) {
  const start = m.index + m[0].length
  const end = raw.indexOf('endstream', start)
  if (end === -1) continue

  try {
    const chunk = Buffer.from(raw.slice(start, end), 'latin1')
    extracted += inflateSync(chunk).toString('latin1')
  } catch {
    /* not a deflate stream, skip */
  }
}

/*
 * react-pdf emits text as hex glyph codes inside TJ arrays, for example
 * [<44> -31.5 <55> ...] TJ. With a standard font those codes are the character
 * codes themselves, so decoding hex to bytes gives back readable text. That is
 * exactly what makes the file parseable: a subset font with a custom encoding
 * would produce codes that map to nothing.
 */
let text = ''
for (const arr of extracted.matchAll(/\[([^\]]*)\]\s*TJ/g)) {
  for (const token of arr[1].matchAll(/<([0-9A-Fa-f]+)>|\(((?:\\.|[^\\()])*)\)/g)) {
    if (token[1] !== undefined) {
      text += Buffer.from(token[1], 'hex').toString('latin1')
    } else {
      text += token[2].replace(/\\([()\\])/g, '$1')
    }
  }
  text += ' '
}

text = text.replace(/\s+/g, ' ').trim()

console.log(`\nExtracted characters: ${text.length}\n`)

const mustContain = [
  'DUSENGIMANA JEAN BOSCO',
  'dusengimana06@gmail.com',
  '+250 786 946 188',
  'github.com/bosco250',
  'PROFESSIONAL SUMMARY',
  'TECHNICAL SKILLS',
  'WORK EXPERIENCE',
  'EDUCATION',
  'CERTIFICATIONS',
  'Uruti Hub Limited',
  'ZahabuCore',
  'WebAuthn',
  'University of Rwanda',
  'Hanga Pitch Hackathon',
  'jeanbooscodusengimana.vercel.app',
  'Testing & Performance',
  'Apache JMeter',
  'k6',
]

let ok = true
for (const phrase of mustContain) {
  const found = text.includes(phrase)
  if (!found) ok = false
  console.log(`${found ? 'PASS' : 'FAIL'}  ${phrase}`)
}

// Hyphenation across line breaks would split keywords into unmatchable tokens.
const hyphenSplit = /[a-z]- [a-z]/.test(text)
console.log(`${hyphenSplit ? 'FAIL' : 'PASS'}  no words broken by hyphenation`)
if (hyphenSplit) ok = false

console.log(`\n--- first 400 chars ---\n${text.slice(0, 400)}\n`)
process.exit(ok ? 0 : 1)
