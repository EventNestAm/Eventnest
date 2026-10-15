// npm i -D sharp   then:   node optimize-images.mjs
// Makes 900px-wide WebP copies next to your JPGs (~10-20x smaller).
import sharp from "sharp";
import { readdirSync } from "node:fs";

const dir = "public/images/events/KarginHaxordum";
for (const f of readdirSync(dir).filter((f) => /\.jpe?g$/i.test(f))) {
	await sharp(`${dir}/${f}`)
		.rotate()
		.resize({ width: 900, withoutEnlargement: true })
		.webp({ quality: 78 })
		.toFile(`${dir}/${f.replace(/\.jpe?g$/i, ".webp")}`);
	console.log("done", f);
}
