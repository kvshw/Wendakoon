import { JsonLd } from "@/components/json-ld"
import { HomeContent } from "@/components/home-content"
import {
  getPersonJsonLd,
  getWebSiteJsonLd,
  getWebPageJsonLd,
} from "@/lib/json-ld"
import { siteConfig } from "@/lib/site"

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          getPersonJsonLd(),
          getWebSiteJsonLd(),
          getWebPageJsonLd(
            "/",
            siteConfig.title,
            siteConfig.description
          ),
        ]}
      />
      <HomeContent />
    </>
  )
}
