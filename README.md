# ghost-contact-form
Add a beautiful, fully functional contact form to your Ghost blog or website without paying for external services.
Not running on Ghost? This solution also works with Gatsby, Hugo, Hexo, Nuxt and any other static site geberator.

## Tutorial
- [Contact Forms in Ghost](https://atmolabs.org/contact-forms-in-ghost/)

## Prerequisites
- A supported version of Node.js
- npm to manage packages

## Quickstart Install

```
$ git clone https://github.com/styxlab/ghost-contact-form.git
$ cd ghost-contact-form
$ sh install.sh
```

## Configure

Adapt the `.env` file to your needs. The following variables must be defined.

```
SMTP_HOST = mail.server.com
SMTP_USER = user@server.com
SMTP_PASS = strong password
ALLOW_ORIGIN = https://your-blog.com
EMAIL_FROM = noreply@your-blog.com
EMAIL_TO = your@email.com
```

## Usage

```
$ node ghost-contact-svc.js
```

## Test Locally

[http://localhost:7000/v1/demo](http://localhost:7000/v1/demo)

## Deploy (More detailed info in the tutorial)

- copy the work folder `ghost-contact-form` to your server
- use a systemd unit to run `ghost-contact-svc.js` as a deamon
- configure your webserver to map endpoint `http://localhost:7000/` to a public endpoint, e.g. `https://api.your-blog.com/`
- Use the files in folder `ghost-admin` to configure your front-end

- 