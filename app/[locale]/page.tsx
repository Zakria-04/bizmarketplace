import { useTranslations } from "next-intl";
import React from "react";

const page = () => {
  const t = useTranslations("LandingPage");
  return <div>Greeting:{t("greeting")}</div>;
};

export default page;
