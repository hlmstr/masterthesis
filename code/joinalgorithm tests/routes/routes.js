

module.exports = (app) => {
//returnes one or several services
  app.route('/handle')
    .get((req,res)=>{
      console.log("hello")
    }); //works
}