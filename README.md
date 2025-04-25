# Sanity Astro Club: A Free Astro Template for Showcasing And Selling Digital Products

Sanity Astro Club is a free Astro template for showcasing artworks or any other digital product — an experimental proof of concept first built by [Codrops](https://www.codrops.com) in collaboration with [Alex Tkachev](https://alextkachev.com/).
[Soufiane](https://soufianee.com) then enhanced the template with the addition of an extendable [Sanity](https://sanity.io/) Studio to handle content and a simple [Polar](https://polar.sh/) API integration for generating checkout sessions.

![Image Title](https://tympanus.net/codrops/wp-content/uploads/2025/02/PlayersClub_Template_featured.png)

[Original Article on Codrops](https://tympanus.net/codrops/?p=86632)

[Demo](https://sanity-astro-club.netlify.app/)

## Folder Structure

```plaintext
├── frontend/          # Astro application
├── studio/            # Sanity Studio
└── package.json       # Root workspace configuration
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command                    | Action                                           |
| :------------------------- | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm run dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm run build`           | Build your production site to `./dist/`          |
| `pnpm run preview`         | Preview your build locally, before deploying     |
| `pnpm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm run astro -- --help` | Get help using the Astro CLI                     |

## Credits

- Design based on [Alex Tkachev's](https://alextkachev.com/) [Players Club Dribbble shot](https://dribbble.com/shots/25156320-Players-Club-UI-Animation).
- Original Template by [Codrops](https://codrops.com)
- Template extension and Artworks by [Soufiane](https://soufianee.com)

## Misc

Follow Codrops: [Bluesky](https://bsky.app/profile/codrops.bsky.social), [Facebook](http://www.facebook.com/codrops), [GitHub](https://github.com/codrops), [Instagram](https://www.instagram.com/codropsss/)
Follow Soufiane [Bluesky](https://bsky.app/profile/soufianee.com), [GitHub](https://github.com/jazsouf), [Instagram](https://www.instagram.com/snfejzl/)

## License

[MIT](LICENSE)

Made with :blue_heart: by [Codrops](https://www.codrops.com)
Extended with :yellow_hear: by [Soufiane](https://soufianee.com)

## Deployment and Configuration

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

### Deploy Frontend

You have the freedom to deploy your app to your hosting provider of choice.

### Configuration

There are env.example files for the studio and frontend folders, with the relevant secrets that need to be filled.
You need to create a [Polar](https://polar.sh) account, add your products and create an API key with read and write access to checkout_links, checkouts and products.
You need to add your Polar API key and your Polar Organisation ID in the secret tab inside your [Sanity](https://www.sanity.io/manage).
You can also need to setup a webhook to trigger rebuilds when content changes.

Contact me via email [jazsouf@pm.me](mailto:jazsouf@pm.me) or dm on bluesky if you need anything.

## Next steps

- [ ] Add basic client-side cart functionality
- [ ] Add full server-side cart functionality
