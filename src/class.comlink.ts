import "@babel/polyfill";

import sha1 from "sha1";

export default class ComlinkClass {
  seed?: string;
  async setSeed(seed: string) {
    this.seed = seed;
  }

  async getHash(s: string) {
    return this.seed + sha1(s);
  }
}
