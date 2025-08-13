# Sanity Astro Club: A Free Astro Template for Showcasing Digital Products

Sanity Astro Club is a free Astro template for showcasing artworks or any other digital product.
At first, an experimental proof of concept built by [Codrops](https://www.codrops.com) in collaboration with [Alex Tkachev](https://alextkachev.com/).
[Soufiane](https://soufianee.com) then enhanced the template with the addition of an extendable [Sanity](https://sanity.io/) Studio to handle content.

![Image Title](https://cdn.sanity.io/images/awmb54he/production/f785e514977a6c57e1f9a32dd8e73e8083e1d1dc-2879x1698.png)

[Demo](https://sanity-astro-club.netlify.app/)

## Folder Structure

```plaintext
├── frontend/          # Astro application
├── studio/            # Sanity Studio
└── package.json       # Root workspace configuration
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                                      | Action                                                                                |
| :------------------------------------------- | :------------------------------------------------------------------------------------ |
| `pnpm install`                               | Installs dependencies for the frontend asn studio workspaces                          |
| `pnpm run dev`                               | Starts local dev server at `localhost:4321` for Astro and `localhost:3333` for Sanity |
| `pnpm --filter=frontend run build`           | Build your Astro production site to `./dist/`                                         |
| `pnpm --filter=frontend run preview`         | Preview your Astro build locally, before deploying                                    |
| `pnpm --filter=frontend run astro ...`       | Run Astro CLI commands like `astro add`, `astro check`                                |
| `pnpm --filter=frontend run astro -- --help` | Get help using the Astro CLI                                                          |
| `pnpm --filter=frontend run lint`            | Lint your Astro code using Biome                                                      |
| `pnpm --filter=frontend run format`          | Format your Astro code using Biome                                                    |
| `pnpm --filter=studio run build`             | Build your studio site to `./dist/`                                                   |
| `pnpm --filter=studio run start`             | Preview your Sanity Studio build locally, before deploying                            |
| `pnpm --filter=studio run deploy`            | Deploy your Sanity Studio on the Sanity Cloud                                         |

## Credits

- Design based on [Alex Tkachev's](https://alextkachev.com/) [Players Club Dribbble shot](https://dribbble.com/shots/25156320-Players-Club-UI-Animation).
- Original Template by [Codrops](https://codrops.com). Checkout the [original article on Codrops](https://tympanus.net/codrops/?p=86632)
- Template extension and Artwork content by [Soufiane](https://soufianee.com)

## Misc

Follow Codrops: [Bluesky](https://bsky.app/profile/codrops.bsky.social), [Facebook](http://www.facebook.com/codrops), [GitHub](https://github.com/codrops), [Instagram](https://www.instagram.com/codropsss/)
Follow Soufiane [Bluesky](https://bsky.app/profile/soufianee.com), [GitHub](https://github.com/jazsouf), [Instagram](https://www.instagram.com/snfejzl/)

## License

[MIT](LICENSE)

Made with :blue_heart: by [Codrops](https://www.codrops.com)
Extended with :yellow_heart: by [Soufiane](https://soufianee.com)

## Deployment and Configuration

### Deploy Frontend

You have the freedom to deploy your app to your hosting provider of choice.

### Deploy Studio

To deploy your Sanity Studio to production:

1. Make sure you're logged in to your Sanity account:

```bash
npx sanity login
```

2. Deploy the studio:

```bash
pnpm --filter=studio run deploy
```

### Configuration

There are <code>env.example</code> files for the studio and frontend folders with the relevant environment variables that need to be filled.

Contact me via email [jazsouf@pm.me](mailto:jazsouf@pm.me) or dm on bluesky if you need anything.

## Next steps

- [ ] Add cart functionality w/ Astro sessions
- [ ] Rewrite scripts in Typescript
