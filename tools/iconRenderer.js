import { readdirSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { imageSize } from 'image-size'
import tinify from 'tinify'
import encoder from 'image-to-base64'

import { apiKey } from '../secrets/tinypng.js'

tinify.key = apiKey

const basePath = resolve('./icons')
const sizes = [512, 256, 128, 64, 32, 16]
const readdirOptions = { withFileTypes: true, recursive: true }


const iconList = readdirSync(basePath, readdirOptions)
const actions = (await Promise.all(iconList.flatMap(async (iconListItem) => {
  if (
    !iconListItem.isFile() ||
    (iconListItem.parentPath && iconListItem.parentPath.endsWith('output'))
  ) return
  const iconFileName = iconListItem.name.split('.')
  const fileName = iconFileName.shift()
  const fileExt = iconFileName.pop()
  const outputPath = resolve(iconListItem.parentPath + '/../output')
  const inputFile = resolve(`${iconListItem.parentPath}/${iconListItem.name}`)

  const dimensions = imageSize(readFileSync(inputFile))
  const maxSize = Math.max(
    ...Object.keys(dimensions)
      .map(k => dimensions[k])
      .filter(e => !isNaN(e))
  )
  const actions = []
  sizes.forEach(size => {
    if (maxSize < size) return
    const resizedIconFileName = resolve(`${outputPath}/${fileName}.${size}.${fileExt}`)
    const encodedIconFileName = resolve(`${outputPath}/${fileName}.${size}.txt`)
    const action = {
      resize: undefined,
      encode: undefined,
    }
    let intermediate = undefined
    if (!existsSync(resizedIconFileName)) {
      action.resize = {
        from: inputFile,
        to: resizedIconFileName,
        size
      }
    } else {
      intermediate = resizedIconFileName
    }
    if (!existsSync(encodedIconFileName)) {
      action.encode = {
        from: inputFile,
        intermediate,
        to: encodedIconFileName,
        type: dimensions.type,
        size
      }
    }
    if (action.resize || action.encode)
      actions.push(action)
  })
  return actions
}))).filter(e => e).flat()

for (const { resize, encode } of actions) {
  let intermediate = undefined
  // resizing logic
  if (resize) {
    mkdirSync(dirname(resize.to), { recursive: true })
    const source = tinify.fromFile(resize.from)
    const resized = source.resize({
      method: 'scale',
      width: resize.size
    })
    await resized.toFile(resize.to)
    intermediate = resize.to
  }

  // base64 logic
  if (encode) {
    intermediate = intermediate || encode.intermediate
    if (!intermediate || !existsSync(intermediate)) {
      console.error('Missing intermediate, skipping')
      console.log(JSON.stringify(encode, null, '  '))
    } else {
      if (existsSync(encode.to)) {
        console.error('Result file exists, skipping')
      } else {
        mkdirSync(dirname(encode.to), { recursive: true })
        encoder(intermediate)
          .then(response => {
            writeFileSync(encode.to, `data:image/${encode.type};base64,${response}`)
          })
      }
    }
  }
}
