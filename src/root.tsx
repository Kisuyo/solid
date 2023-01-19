// @refresh reload
import { Suspense } from "solid-js"
import { useAssets } from "solid-js/web"
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start"
import { css, renderSheets, StyleRegistry } from "solid-styled"

function GlobalStyles() {
  css`
    @global {
      body {
        /* font-family: Gordita, Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif; */
          margin: 0px;
          background-color: #d6d1cc;
      }

      a {
        margin-right: 1rem;
      }

      main {
        text-align: center;
      }
      h1 {
        font-size: 64px
        font-family: Prompt;
      }
      p {
        /* max-width: 14rem; */
        margin: 2rem auto;
        line-height: 1.35;
        font-size: 20px;
      }

      @media (min-width: 480px) {
        h1 {
          max-width: none;
        }

        p {
          max-width: none;
        }
      }
    }
  `
  return null
}

export default function Root() {
  const sheets = []
  useAssets(() => renderSheets(sheets))

  return (
    <StyleRegistry styles={sheets}>
      <Html lang="en">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:wght@100;800&display=swap"
          rel="stylesheet"
        ></link>
        <Head>
          <Title>SolidStart - Bare</Title>
          <Meta charset="utf-8" />
          <Meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Body>
          <GlobalStyles />
          <Suspense>
            <ErrorBoundary>
              <Routes>
                <FileRoutes />
              </Routes>
            </ErrorBoundary>
          </Suspense>
          <Scripts />
        </Body>
      </Html>
    </StyleRegistry>
  )
}
