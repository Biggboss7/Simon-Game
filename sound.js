const soundFileNames = ["red", "yellow", "green", "blue", "wrong"];

const createSound = function (paths) {
  return paths.reduce((acc, cv) => {
    return { ...acc, [cv]: new Audio(`./sounds/${cv}.mp3`) };
  }, {});
};

export default createSound(soundFileNames);
