import got from "got";
import { promises as fsp } from "fs";

const getJSONFromWWWPromise = (url) => got(url).json();

export { getJSONFromWWWPromise };
