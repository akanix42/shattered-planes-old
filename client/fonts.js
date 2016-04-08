export default new Promise((resolve, reject) => {
  WebFont.load({
    google: {
      families: ['Nova Square']
    },
    active(){
      resolve();
    }
  });
});
