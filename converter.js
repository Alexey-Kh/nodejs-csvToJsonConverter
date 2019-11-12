const fs = require('fs')
const path = require('path')

const convert = (filePath, callback)=>{
  // Read CSV file, return trimmed string
  const readCsv = (filePath) => {
    return fs.readFileSync(filePath, {encoding: 'utf8'}).trim()
  }

  // Convert trimmed CSV string to JSON, return JSON
  const csvToJson = (scvString) => {
    let csvArr = scvString.split(/\r?\n/)
    let keys = csvArr[0].split(',')
    return json = csvArr.slice(1).map((e) => {
      let record = {}
      let values = e.split(',')
      for (let i in keys) {
        record[keys[i]] = values[i]
      }
      return record
    })
  }

  // Make target file path from source path
  const makeTargetPath = (sourcePath) => {
    return path.join(path.dirname(sourcePath), path.basename(sourcePath, 'csv')+'json')
  }

  // Save json object in the directory
  const saveJsonFile = (filePath, jsonObject) => {
    fs.writeFileSync(filePath, JSON.stringify(jsonObject), 'utf8')
  }

  try {
    let targetPath = makeTargetPath(filePath)
    let jsonObject = csvToJson(readCsv(filePath))
    console.log(jsonObject[0]) // TODEL: For test purposes
    saveJsonFile(targetPath, jsonObject)
    console.log(`JSON file (${targetPath}) saved successfully.`)
  } catch (e) {
    callback(e)
  }
}

convert(process.argv[2], (e)=>{
  console.log(e)
})
