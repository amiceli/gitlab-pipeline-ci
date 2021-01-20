import { exec } from './mod.ts'
import { parse } from "https://deno.land/std/flags/mod.ts";

const { args } = Deno

console.clear()
await exec(parse(args))

setInterval(async () => {
    console.clear()

    await exec(parse(args))
}, 5000)