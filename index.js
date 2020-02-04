//read all exif from files in a folder

const fs = require('fs-extra')
const path = require('path')

const ExifTool = require('exiftool-kit')
let exiftoolpath = 'C:\\Program Files (x86)\\ExifTool\\exiftool.exe'
const exiftool = new ExifTool(exiftoolpath)

let filePath = 'D:\\Port Elizabeth Museum\\Herpetology\\TIFF\\Frogs'
fs.readdir(filePath).then(filenames => {

  //lets test with 10
  //filenames = filenames.slice(0,10)  
  let readFileNamesArr = []
  filenames.forEach(filename => {
    readFileNamesArr.push(exiftool.getTags({
      source: path.join(filePath,filename)
    }))
  })

  let imagesPerDate = {}

  Promise.all(readFileNamesArr).then(exifs => {
    exifs.forEach(exif => {
      let createDate = exif.FileCreateDate
      let datePart = createDate.split(' ')[0].trim()
      datePart = datePart.replace(/:/g, '/')

      if(imagesPerDate[datePart]){
        imagesPerDate[datePart]++
      }
      else {
        imagesPerDate[datePart] = 1
      }
    })

    //we need to order the dates
    let orderedDates = Object.keys(imagesPerDate).sort()

    orderedDates.forEach(date => {
      console.log(date + ': ' + imagesPerDate[date])
    })

  }).catch(err => console.log('error reading files: '  + err.message))

})
.catch(err => console.log('error reading filenames: ' + err.message))

