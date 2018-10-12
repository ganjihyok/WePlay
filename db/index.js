const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mvp');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  posting_list: Array,
  participate: Array,
  picUrl: String
});

const listSchema = mongoose.Schema({
  ownerEmail: String,
  ownerUsername: String,
  name: String,
  detail: String,
  url: String,
  players: Array
});

const User = mongoose.model('User', userSchema);
const List = mongoose.model('List', listSchema);

const recentList = (username, participations, query, callback) => {
  if (username) {
    List.find({ ownerUsername: username }, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }).sort({ _id: -1 }).limit(8);
  } else if (participations) {
    List.find({ _id: { $in: participations } }, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }).sort({ _id: -1 }).limit(8);
  } else if (query) {
    List.find({ name: query }, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }).sort({ _id: -1 }).limit(8);
  } else {
    List.find({}, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    }).sort({ _id: -1 }).limit(8);
  }
};

const fetchMore = (multiplier, callback) => {
  List.find({}, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  }).sort({ _id: -1 }).skip(multiplier * 18).limit(18);
};

const postSong = (songInfo, callback) => {
  List.create(songInfo, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      const vid_id = result._id;
      User.findOneAndUpdate({ email: songInfo.ownerEmail, username: songInfo.ownerUsername }, { $push: { posting_list: vid_id } }, (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

const updateSong = (updatedSong, callback) => {
  List.findOneAndUpdate({ _id: updatedSong._id }, updatedSong, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const updateUser = (email, username, vid_id, pull, callback) => {
  if (pull) {
    User.findOneAndUpdate({ email, username }, { $pull: { participate: vid_id } }, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  } else {
    User.findOneAndUpdate({ email, username }, { $push: { participate: vid_id } }, (err, result) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

const emailValidation = (email, callback) => {
  User.find({ email }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const usernameValidation = (username, callback) => {
  User.find({ username }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const checkAvailability = (email, username, callback) => {
  User.find({ email, username }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const login = (userInfo, callback) => {
  User.find({
    email: userInfo.email,
    password: userInfo.password
  }, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

const post = (userInfo, callback) => {
  const newUser = userInfo;
  newUser.posting_list = [];
  newUser.participate = [];
  User.create(newUser, (err, result) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result);
    }
  });
};

module.exports = {
  recentList,
  post,
  checkAvailability,
  login,
  postSong,
  updateSong,
  emailValidation,
  usernameValidation,
  updateUser,
  fetchMore
};