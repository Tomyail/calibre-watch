console.log('xx2',process.argv)
process.once("SIGHUP", function (...args) {
  console.log('xx',args)
})
