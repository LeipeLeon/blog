---
layout: post
title: "DIP: use .env variables in your dip.yml configuration"
date: 2023-01-26 12:30:00 CES
---

As stated in my post [Keeping histories in `dip provision`](/posts/2023/01/keep_irb_histories_when_running_dip_provision):

> I've found no way to use the env var in the yaml. (therefore I'm hardcoding it in the `dip.yml`)

Tehre is an temporary solution by leveraging ERB in yaml. This way we can load the `.env` (which is also used by docker compose itself) and use vars defined there in our dip configuration:

- By loading the `dotenv` gem inside the YAML
- These snippets make sure that there is a default value (e.g. `api`)
  - `dip.yml`: `docker volume create <%= ENV.fetch('COMPOSE_PROJECT_NAME', 'api') %>`
  - `docker-comose.yml`: `name: ${COMPOSE_PROJECT_NAME:-api}-history`

The next step would be a PR agains the [`dip`](https://github.com/bibendi/dip) gem but that is for another day.

### dip.yml

```yml
<%
begin
  require "dotenv"
  Dotenv.load
  puts "🎉 Dotenv loaded!"
rescue LoadError
  puts "🚨 Dotenv not loaded, ignoring '.env' files"
end
%>
#...
provision:
  - dip compose down --volumes --remove-orphans
  - docker volume create <%= ENV.fetch('COMPOSE_PROJECT_NAME', 'api') %>-history
  ...
```

### docker-compose.yml

```yml
volumes:
  history:
    external: true
    name: ${COMPOSE_PROJECT_NAME:-api}-history
```
