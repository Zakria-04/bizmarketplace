import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/images/logo.png";

const Brand = () => {
  return (
    <Link
      href="/"
      aria-label="מעבר לדף הבית של EsekPlus"
      className="inline-flex flex-col items-start"
    >
      <Image src={logo} alt="EsekPlus logo" priority className="w-40" />

      <p
        className="mt-1 text-xs font-medium text-slate-500"
        style={{ fontFamily: "var(--font-hebrew)" }}
      >
        הדרך של העסק שלך לצמוח
      </p>
    </Link>
  );
};

export default Brand;
