import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type Props = {
  description?: string
  lang?: string
  meta?: Array<{ name: string; content: string }>
  title: string
}

export const Seo: React.FC<Props> = ({
  description = "",
  lang = "ru",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : void 0}
      link={[
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
          crossOrigin: "crossorigin",
        },
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
        {
          rel: "mask-icon",
          href: "/safari-pinned-tab.svg",
          color: "#e72f89",
        },
      ]}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:site_name",
          content: "Ordo.pink",
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:locale",
          content: "ru_RU",
        },
        {
          property: "og:image",
          content: "https://ordo.pink/og.png",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:creator",
          content: "@ordo_pink",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          property: "twitter:image",
          content: "https://ordo.pink/og.png",
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
        {
          name: "msapplication-TileColor",
          content: "#603cba",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ].concat(meta)}
    />
  )
}
