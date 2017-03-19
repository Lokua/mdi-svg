const fs = require(`mz/fs`)
const path = require(`path`)
const walk = require(`recursive-readdir`)
const camelcase = require(`camelcase`)

const root = __dirname
const out = `${root}/svg`
const mdi = `${root}/node_modules/material-design-icons`
const demo = `${root}/demo`

run()

function run() {
  const start = new Date()
  log(`Walking mdi directory...`)
  walk(mdi, [`!*24px.svg`], async (err, paths) => {
    try {
      if (err) throw err
      await copyIcons(paths)
    } catch (e) {
      console.error(`caught:`, e)
    } finally {
      log(`Done: ${(new Date() - start) / 1000}s`)
    }
  })
}

async function copyIcons(_paths) {
  const paths = _paths.filter(filter)
  log(`About to copy ${paths.length} out of ${_paths.length} files`)

  const names = paths.map(createNameFromPath)
  const files = await Promise.all(readFiles(paths))

  const html = (await Promise.all(names.map(async (name, i) => {
    await fs.writeFile(`${out}/${name}.svg`, files[i], `utf8`)

    return createSvgSwatch(name, files[i])
  }))).join(``)

  log(`Writing demo html file...`)
  await writeHtml(html)
}

function filter(p) {
  return /.+\/production\/.+24px\.svg/.test(p)
}

function createNameFromPath(p) {
  return camelcase(path.basename(p).replace(/^ic|24px\.svg/g, ``))
}

function readFiles(paths) {
  return paths.map(p => fs.readFile(p, `utf8`))
}

function createSvgSwatch(name, svg) {
  return `
    <div class="iconBox" data-clipboard-text="${name}">
      <p title="${name}">${name}</p>
      ${svg}
    </div>
  `
}

async function writeHtml(html) {
  const p = `${demo}/template.html`
  const template = (await fs.readFile(p, `utf8`)).replace(`%%CONTENT%%`, html)
  await fs.writeFile(`${demo}/index.html`, template, `utf8`)
}

function log(msg) {
  console.log(`mdi-svg [LOG] ${msg}`)
}
