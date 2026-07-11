import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo.png";

const Brand = () => {
  return (
    <Link
      href="/"
      aria-label="BizMarketplace homepage"
      className="flex items-center gap-2"
    >
      <h1 className="text-sm font-semibold text-gray-800 sm:text-base lg:text-lg">
        BizMarketplace
      </h1>

      <Image
        src={logo}
        alt="BizMarketplace logo"
        priority
        className="size-11 object-contain sm:size-12"
      />
    </Link>
  );
};

export default Brand;
