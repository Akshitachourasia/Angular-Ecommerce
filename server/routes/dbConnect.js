const {default:mongoose} = require('mongoose');

const dbConnect =  async() => {
  try {
let conn = await mongoose.connect("mongodb+srv://akshitacbrainerhub:Angular@cluster.zl7oj6j.mongodb.net/")
  } catch (error) {
    console.log(error)
    process.exit()
  }
}
 module.exports = dbConnect;