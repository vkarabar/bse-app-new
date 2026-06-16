import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/proizvodi/motori-porti-it",
        destination: "/proizvodi/motori-porti/italianski",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
