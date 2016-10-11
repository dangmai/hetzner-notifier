hetzner-notifier
================

Automatically send email notifications when Hetzner's server auctions drop below
a certain price threshold.

Usage
=====

```
npm install
node index.js --email_to your@email.com --smtp_host smtp.server.com --smtp_accept_unauthorized
```

Parameters
----------

*Email parameters:*

- `smtp_host` - Required: The SMTP server to use.
- `smtp_port` - Optional: The SMTP port to connect to (default: 25).
- `smtp_username` - Optional: The SMTP username.
- `smtp_password` - Optional: The SMTP password.
- `smtp_accept_unauthorized` - Optional: If this flag is passed in, the script
will accept connection to a SMTP server with a self-signed TLS key.
- `email_to` - Required: The email address to email notifications to.
- `email_from` - Optional: The email address to email notifications from
(default: `hetzner@me.com`).

*Hetzner specific parameters:*
- `country` - Optional: The country you're in.
Hetzner charges different prices based on this information (default: US).
- `threshold` - Optional: The price threshold (in euro) below which
notifications are sent (default: 30).
- `ram` - Optional: Minimum RAM (in GB).
- `hdnr` - Optional: Minimum number of HDD's.
- `hdsize` - Optional: Minimum HDD size (in GB).
- `text` - Optional: Miscellaneous text to search (e.g. SSD)
