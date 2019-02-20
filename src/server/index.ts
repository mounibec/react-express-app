import WebServer from './web-server';

process.on('uncaughtException', (err) => {
  console.error('uncaughtException', err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("unhandledRejection", {reason, promise});
  throw reason;
});

void (async () => {
  try {
    await new WebServer().start();
    console.log(`${new Date}: Server Started`);
  } catch (e) {
    console.error('RUN_ERROR', e.stack);
    process.exit(1);
  }
})();
