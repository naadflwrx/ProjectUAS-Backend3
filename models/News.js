// import database
const db = require("../config/database");

// membuat class Model News
class News {
  static getAllNews(callback) {
    db.query('SELECT * FROM news', callback);
  }

  static addNews(newsData, callback) {
    db.query('INSERT INTO news SET ?', newsData, callback);
  }
}


// export class News
module.exports = News;