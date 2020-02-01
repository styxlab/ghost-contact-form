# ghost-contact-form
Contact Forms in Ghost — Without External Services

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
