function objToString(value) {
  console.log(value);
  if (typeof value === "object") {
    let str = "";
    for (const key in value) {
      str += key + " " + value[key] + "-";
    }
    return str;
  } else {
    let object = {
      _id: null,
      username: null,
      bio: null,
      workPlace: null,
      email: null,
      img: null,
      firstName: null,
      lastName: null,
      password: null,
    };
    const arr = value.split("-");

    arr.forEach((char) => {
      Object.keys(object).forEach((key) => {
        if (char.slice(0, key.length) === key) {
          object[key] = char.slice(key.length + 1);
        }
      });
    });
    return object;
  }
}

export default objToString;
