fs.readdir('D:\\Port Elizabeth Museum\\Herpetology\\TIFF\\Frogs').then(filenames => {

  //lets test with 10
  filenames = filenames.slice(0,10) 
  console.log(filenames) 
})