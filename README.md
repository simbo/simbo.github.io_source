# simbo.github.io (Sources)

[![Uptime Robot ratio (30 days)](https://img.shields.io/uptimerobot/ratio/m777162478-e175ed9f7fd10f035bc5d20d)](https://simbo.codes/)
[![GitHub package.json dynamic](https://img.shields.io/github/package-json/version/simbo/simbo.github.io_source)](https://github.com/simbo/simbo.github.io_source/blob/master/package.json)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/simbo/simbo.github.io_source/CI/master)](https://github.com/simbo/simbo.github.io_source/actions?query=workflow%3ACI)
[![GitHub last commit](https://img.shields.io/github/last-commit/simbo/simbo.github.io_source/master)](https://github.com/simbo/simbo.github.io_source/commits/master)

Sources of [simbo.codes](https://simbo.codes/), my personal GitHub pages.

See generated contents at [simbo/simbo.github.io](https://github.com/simbo/simbo.github.io).

---

## Stack

This project uses...

- vue with pug, scss and typescript
- typed.js, shortid and css-reset-and-normalize as frontend modules
- parcel as bundler using postcss, autoprefixer, css-mqpacker, cssnano
- prettier for formatting

## Usage

```sh
# for development (build, serve and watch)
yarn start

# for production build
yarn build

# to serve the production build for testing
yarn serve
```

## Deployment

...is done automatically using
[GitHub Actions](https://github.com/simbo/simbo.github.io_source/actions),
triggered on changes to `master`.
