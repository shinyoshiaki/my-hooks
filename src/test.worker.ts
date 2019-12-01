import "@babel/polyfill";

const ctx: Worker = self as any;

ctx.addEventListener("message", async e => {
  ctx.postMessage("i am worker " + e.data);
});
