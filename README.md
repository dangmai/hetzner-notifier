hetzner-notifier
================

Automatically send email notifications when Hetzner's server auctions drop below
a certain price threshold.

Usage
=====

```
npm install
node index.js --email_to your@email.com --smtp_host smtp.server.com
```

Parameters
----------

*Email parameters:*

- `smtp_host` - Required: The SMTP server to use.
- `smtp_port` - Optional: The SMTP port to connect to (default: 25).
- `smtp_username` - Optional: The SMTP username.
- `smtp_password` - Optional: The SMTP password.
- `email_to` - Required: The email address to email notifications to.
- `email_from` - Optional: The email address to email notifications from
(default: `hetzner@me.com`).

*Hetzner specific parameters:*
- `threshold` - Optional: The price threshold (in euro) below which
notifications are sent (default: 30).
- `ram` - Optional: Minimum RAM (in GB).
- `hdnr` - Optional: Minimum number of HDD's.
- `hdsize` - Optional: Minimum HDD size (in GB).
- `text` - Optional: Miscellaneous text to search (e.g. SSD)
