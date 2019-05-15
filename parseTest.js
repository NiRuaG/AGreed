const { parseString } = require('xml2js');
const { path } = require('ramda');

const afterParse = async (err, result) => {
  if (err) return;
  // console.dir(result);

    const id =
      Promise.resolve(result)
        .then(path(['user', '$', 'id']))

        .then(id => {
          // console.log("id:\n", id);
          // console.log(`[${id}]`);

          if (id) { return { id }; } // wrap id in an object

          throw new Error("path to user's id = empty or DNE");
        })

        .catch(error => {
          console.log("Error @ checkUserName", error);
        });

    console.log(await id);
}

const afterFileRead = (err, data) => {
  if (!err) {
    parseString(data, afterParse);
  }
}

require('fs').readFile('./userdata.xml', afterFileRead);