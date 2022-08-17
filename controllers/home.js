module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getInfo: (req, res) => {
    res.render("info.ejs");
  },
  getExample: (req, res) => {
    res.render("example.ejs");
  }
};
