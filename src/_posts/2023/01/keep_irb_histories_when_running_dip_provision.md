---
layout: post
title:  "Keep (bash/irb/psql) histories when running `dip provision`"
date:   2023-01-25 14:29:00 CES
---

I'm a big fan of [`dip`, the Docker Interaction Program](https://github.com/bibendi/dip).

But everytime I'm running `dip provision` my bash/irb/psql history in shell and such get deleted.

Therefore docker external volumes FTW. These volumes won't be destroyed by the `dip provision` command.

The only caveat is when you use `COMPOSE_PROJECT_NAME` that you name it properly b/c I've found no way to use the env var in the yaml. (therefore I'm hardcoding it in the `dip.yml`)

```yaml
# docker-compose.yml
services:
  rails:
    volumes:
      - history:/usr/local/hist
      # ...
    environment:
      HISTFILE: /usr/local/hist/.bash_history
      PSQL_HISTFILE: /usr/local/hist/.psql_history
      IRB_HISTFILE: /usr/local/hist/.irb_history
      # ...
volumes:
  history:
    external: true
    name: memoriamtv-api-history
  # ...
```

```yaml
# dip.yml
compose:
  project_name: memoriamtv-api

# ...

provision:
  # Remove old containers and volumes.
  - dip compose down --volumes --remove-orphans
  # create
  - docker volume create memoriamtv-api-history
  # ...
```
