import { mkdir, readdir, rename, stat } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const publicDir = path.resolve("public")
const sourceDir = path.resolve("assets-src", "images")
await mkdir(sourceDir, { recursive: true })

const [publicFiles, archivedFiles] = await Promise.all([readdir(publicDir), readdir(sourceDir)])
const files = [
  ...publicFiles.filter((name) => name.toLowerCase().endsWith(".png")).map((name) => ({ name, directory: publicDir })),
  ...archivedFiles.filter((name) => name.toLowerCase().endsWith(".png")).map((name) => ({ name, directory: sourceDir })),
]
const placeholders = /^placeholder-/i
const smallStaticAssets = /^(apple-icon|icon-dark-32x32|icon-light-32x32)$/i

for (const { name: filename, directory } of files) {
  const stem = path.basename(filename, path.extname(filename))
  if (placeholders.test(stem) || smallStaticAssets.test(stem)) continue

  const logo = /logo/i.test(stem)
  const hero = /worker|hero/i.test(stem)
  const maxSide = logo ? 400 : hero ? 1920 : 960
  const source = path.join(directory, filename)
  const output = path.join(publicDir, `${stem}.webp`)
  const original = path.join(sourceDir, filename)
  const metadata = await sharp(source).metadata()

  await sharp(source)
    .rotate()
    .resize({ width: maxSide, height: maxSide, fit: "inside", withoutEnlargement: true })
    .webp({ quality: hero ? 75 : 78, effort: 5 })
    .toFile(output)
  if (directory === publicDir) await rename(source, original)

  const [inputStat, outputStat] = await Promise.all([stat(original), stat(output)])
  console.log(`${filename} (${metadata.width}x${metadata.height}, ${inputStat.size} bytes) -> ${path.basename(output)} (${outputStat.size} bytes)`)
}
