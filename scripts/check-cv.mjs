/**
 * Renders the CV template to a file and asserts it is a real, text-based PDF.
 * Run with: node --experimental-strip-types scripts/check-cv.mjs
 */
import { renderToFile } from '@react-pdf/renderer'
import { readFile, mkdir } from 'node:fs/promises'
import { createElement } from 'react'

import ResumeDocument from '../src/cv/ResumeDocument.tsx'

const out = 'tmp/cv-check.pdf'

await mkdir('tmp', { recursive: true })
await renderToFile(createElement(ResumeDocument), out)

const buf = await readFile(out)
const text = buf.toString('latin1')

const pages = (text.match(/\/Type\s*\/Page[^s]/g) || []).length

const checks = {
  'valid PDF signature': buf.subarray(0, 5).toString() === '%PDF-',
  'non-trivial size': buf.length > 8000,
  'has font resources': text.includes('/Font'),
  'uses Helvetica (standard font)': text.includes('Helvetica'),
  'no raster images embedded': !text.includes('/Subtype /Image'),
  // Two pages is the accepted ceiling; three reads as padded.
  'fits within two pages': pages > 0 && pages <= 2,
}

console.log(`\nFile: ${out}`)
console.log(`Size: ${(buf.length / 1024).toFixed(1)} KB`)
console.log(`Pages: ${pages}`)
console.log('')

let ok = true
for (const [name, passed] of Object.entries(checks)) {
  console.log(`${passed ? 'PASS' : 'FAIL'}  ${name}`)
  if (!passed) ok = false
}

console.log('')
process.exit(ok ? 0 : 1)
