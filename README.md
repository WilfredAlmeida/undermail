![logo-removebg-preview](https://github.com/WilfredAlmeida/undermail/assets/60785452/3ada6791-1658-41cb-a4b2-bd28c71d24e7)

# UnderMail: The MailChimp of Solana with cNFTs

UnderMail aims to provide mailchimp like features to collect, distribute and analyze cNFTs.

UnderMail is powered by [UnderDog's](https://underdogprotocol.com) state of the art cNFT services.

UnderMail takes away chain complexities and provides you with an easy to use interface to mint your cNFTs.

### [Demo](https://youtu.be/zcPvAXPn1E8) (Must Watch)

UnderMail is live on Mainnet. Checkout:  
[Mainnet](https://undermail-five.vercel.app/)  
[Dennet](https://vercel.live/link/undermail-git-staging-wilfredalmeida.vercel.app)

UnderMail supports payments vis Stripe. Checkout the [pricing](https://undermail-five.vercel.app/pricing)

## Features provided by UnderMail are as follows:
- **Project Creation**: Users can create projects and mint as much as cNFTs as they want
- **Bulk Minting**: Users can upload CSV file or paste in bulk addresses to mint cNFTs to.
- **Analytics**: Each minted cNFT has a unique URL that the users can visit to mark the NFT as viewed. The viewes list can be seen on the dashboard. Each project has a view page that lists all availabe NFTs for user which get marked as viewed when user clicks on the nft. Each project also has a **Plausible** dashboard that presents enhanced analytics.
- **Mint History**: UnderMail shows you all of your mints in once place grouped per project.
- **No Chain Complexities**: You don't have to pay in crypto or bothered with the chain in any manner, UnderMail does it all for you. You simple create projects and mint.

### To get the wallet connection nft dashboard, goto a link with the following structure:
`https://undermail-five.vercel.app/project/<proj-id>/view/wallet`

## WIP
The following things are work-in-progress and will be available in upcoming releases of UnderMail. Stay tuned.

- Embeddable HTML Components: Components to copy paste that can be added to your site to collect addresses to mint cNFTs to.
- Integration with Google Sheets: Import addresses directly from your Google Sheets. This might also be an API & a Google Sheets addon to mint directly from Google Sheets. [Needs Dicsussion], feel free to hop in the discussion in the issue.
- Optional `Viewed` cNFT drop: Receivers get an aditional cNFT when they visit the analytics link in their primary cNFT.

## Contribution
UnderMail is not looking for additional contributors at the moment. Please open an issue and discuss whatever you have in mind.

## Tech Stack

UnderMail us built using the following tech:
- Sveltekit
- Supabase: Auth, DB, Storage
- UnderDog API
- Vercel
- IDE: MS Word

### Project Structure
```
.
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── components.json
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── src
│   ├── app.css
│   ├── app.d.ts
│   ├── app.html
│   ├── hooks.server.ts
│   ├── lib
│   │   ├── components
│   │   │   ├── navbar
│   │   │   │   ├── index.ts
│   │   │   │   └── navbar.svelte
│   │   │   └── ui
│   │   │       ├── alert-dialog
│   │   │       │   ├── alert-dialog-action.svelte
│   │   │       │   ├── alert-dialog-cancel.svelte
│   │   │       │   ├── alert-dialog-content.svelte
│   │   │       │   ├── alert-dialog-description.svelte
│   │   │       │   ├── alert-dialog-footer.svelte
│   │   │       │   ├── alert-dialog-header.svelte
│   │   │       │   ├── alert-dialog-overlay.svelte
│   │   │       │   ├── alert-dialog-portal.svelte
│   │   │       │   ├── alert-dialog-title.svelte
│   │   │       │   └── index.ts
│   │   │       ├── avatar
│   │   │       │   ├── avatar-fallback.svelte
│   │   │       │   ├── avatar-image.svelte
│   │   │       │   ├── avatar.svelte
│   │   │       │   └── index.ts
│   │   │       ├── button
│   │   │       │   ├── button.svelte
│   │   │       │   └── index.ts
│   │   │       ├── card
│   │   │       │   ├── card-content.svelte
│   │   │       │   ├── card-description.svelte
│   │   │       │   ├── card-footer.svelte
│   │   │       │   ├── card-header.svelte
│   │   │       │   ├── card-title.svelte
│   │   │       │   ├── card.svelte
│   │   │       │   └── index.ts
│   │   │       ├── dropdown-menu
│   │   │       │   ├── dropdown-menu-checkbox-item.svelte
│   │   │       │   ├── dropdown-menu-content.svelte
│   │   │       │   ├── dropdown-menu-item.svelte
│   │   │       │   ├── dropdown-menu-label.svelte
│   │   │       │   ├── dropdown-menu-radio-group.svelte
│   │   │       │   ├── dropdown-menu-radio-item.svelte
│   │   │       │   ├── dropdown-menu-separator.svelte
│   │   │       │   ├── dropdown-menu-shortcut.svelte
│   │   │       │   ├── dropdown-menu-sub-content.svelte
│   │   │       │   ├── dropdown-menu-sub-trigger.svelte
│   │   │       │   └── index.ts
│   │   │       ├── input
│   │   │       │   ├── index.ts
│   │   │       │   └── input.svelte
│   │   │       ├── label
│   │   │       │   ├── index.ts
│   │   │       │   └── label.svelte
│   │   │       ├── popover
│   │   │       │   ├── index.ts
│   │   │       │   └── popover-content.svelte
│   │   │       ├── sheet
│   │   │       │   ├── index.ts
│   │   │       │   ├── sheet-content.svelte
│   │   │       │   ├── sheet-description.svelte
│   │   │       │   ├── sheet-footer.svelte
│   │   │       │   ├── sheet-header.svelte
│   │   │       │   ├── sheet-overlay.svelte
│   │   │       │   ├── sheet-portal.svelte
│   │   │       │   └── sheet-title.svelte
│   │   │       ├── table
│   │   │       │   ├── index.ts
│   │   │       │   ├── table-body.svelte
│   │   │       │   ├── table-caption.svelte
│   │   │       │   ├── table-cell.svelte
│   │   │       │   ├── table-footer.svelte
│   │   │       │   ├── table-head.svelte
│   │   │       │   ├── table-header.svelte
│   │   │       │   ├── table-row.svelte
│   │   │       │   └── table.svelte
│   │   │       ├── tabs
│   │   │       │   ├── index.ts
│   │   │       │   ├── tabs-content.svelte
│   │   │       │   ├── tabs-list.svelte
│   │   │       │   └── tabs-trigger.svelte
│   │   │       └── tooltip
│   │   │           ├── index.ts
│   │   │           └── tooltip-content.svelte
│   │   ├── index.ts
│   │   ├── utils.ts
│   │   └── vercel.ts
│   └── routes
│       ├── (auth)
│       │   └── login
│       │       └── +page.svelte
│       ├── (private)
│       │   ├── +layout.server.ts
│       │   ├── +layout.svelte
│       │   ├── +layout.ts
│       │   ├── account
│       │   │   └── billing
│       │   │       ├── +page.server.ts
│       │   │       └── +page.svelte
│       │   ├── api
│       │   │   ├── mint
│       │   │   │   └── +server.ts
│       │   │   ├── project
│       │   │   │   └── +server.ts
│       │   │   ├── stripe
│       │   │   │   ├── cancel
│       │   │   │   │   └── +server.ts
│       │   │   │   ├── checkout
│       │   │   │   │   └── +server.ts
│       │   │   │   └── success
│       │   │   │       └── +server.ts
│       │   │   └── view
│       │   │       └── [projectId]
│       │   │           └── [address]
│       │   │               └── +server.ts
│       │   ├── dashboard
│       │   │   ├── +page.server.ts
│       │   │   └── +page.svelte
│       │   └── project
│       │       └── [...projectId]
│       │           ├── +layout.server.ts
│       │           ├── +layout.svelte
│       │           ├── +page.server.ts
│       │           ├── +page.svelte
│       │           ├── analytics
│       │           │   ├── +page.server.ts
│       │           │   └── +page.svelte
│       │           ├── history
│       │           │   ├── +page.server.ts
│       │           │   └── +page.svelte
│       │           ├── mint
│       │           │   ├── +page.server.ts
│       │           │   └── +page.svelte
│       │           └── view
│       │               ├── +page.svelte
│       │               ├── [...mintId]
│       │               │   ├── +page.server.ts
│       │               │   └── +page.svelte
│       │               └── wallet
│       │                   ├── +layout.svelte
│       │                   ├── +page.server.ts
│       │                   └── +page.svelte
│       ├── +layout.server.ts
│       ├── +layout.svelte
│       ├── +layout.ts
│       ├── +page.svelte
│       ├── 404
│       │   └── +page.svelte
│       ├── auth
│       │   ├── +server.ts
│       │   ├── cb
│       │   │   └── +server.ts
│       │   └── logout
│       │       └── +server.ts
│       └── pricing
│           └── +page.svelte
├── static
│   ├── bg.gif
│   ├── bg.mp4
│   ├── favicon.ico
│   └── um.png
├── svelte.config.js
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```
