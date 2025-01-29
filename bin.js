#!/usr/bin/env node
const process = require('process')

// If there are arguments, process them.
const argumentInputs = process.argv.slice(2)
if (argumentInputs.length) transform(argumentInputs)

// Otherwise, process standard input.
const chunks = []
process.stdin
  .on('data', chunk => { chunks.push(chunk) })
  .once('error', error => {
    console.error(error)
    process.exit(1)
  })
  .once('end', () => {
    transform(
      Buffer.concat(chunks)
        .toString('utf8')
        // Remove any trailing newline.
        .replace(/\n\r?$/, '')
        // Split into lines.
        .split(/\n\r?/)
    )
  })

function transform (inputs) {
  const { titleCase } = require('title-case')
  for (const input of inputs) {
    process.stdout.write(titleCase(input.replace(/^the/, 'The')) + '\n')
  }
  process.exit(0)
}
