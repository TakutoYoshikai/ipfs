const ipfsAPI = require("ipfs-api");
const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });
const fs = require("fs");
const { BufferList } = require("bl");

async function add(filePath) {
  const data = fs.readFileSync(filePath);
  const response = await ipfs.add(data);
  if (response && response.length > 0) {
    console.log(response[0].path);
    return response[0].path;
  }
  return null;
}

async function get(cid) {
  const response = await ipfs.files.get(cid);
  fs.writeFileSync("output.dat", response[0].content);
}

module.exports = {
  add,
  get,
}
