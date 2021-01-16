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
  for await (const file of ipfs.files.get(cid)) {
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    content.pipe(fs.createWriteStream("./output.dat"));
  }
}
module.exports = {
  add,
  get,
}
