module.exports = app => {
  // Start server
  app.listen(app.get('port'), () => {
    console.log(` ✔ Express server listening on port ${app.get('port')} in ${app.get('env')} mode`);
  });
};
