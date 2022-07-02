import 'zx/globals'
import chokidar from 'chokidar';
import lodash from 'lodash';
import 'dotenv/config';
const { debounce } = lodash;
const sourceDir = process.env.WATCHING_DIR;
const calibre = process.env.CALIBREDB_PATH;
const log = (message) => console.log(`${new Date().toISOString()}: ${message}`)

if(!sourceDir){
	throw new Error('no sourceDir found')
}
if(!calibre){
	throw new Error('no calibredb_path found')
}
// 加个节流，防止calibredb 同时运行多个实例报错
const def = debounce(async (_path) => {
  // await $`${calibre} add ${path}`;
  await $`${calibre} add -m ignore ${sourceDir}`;
}, 2000);

chokidar
  .watch(sourceDir, {
    ignoreInitial: true,
    awaitWriteFinish: {
      pollInterval: 100,
    },
  })
  .on('ready', () =>log(`listening dir ${sourceDir}...`))
  .on('add', async (path) => {
    log(`receive new file ${path}`);
    def(path);
  });
