---
layout: post
title:  "tip: Less chatty health_check logging in development"
date:   2023-07-21 09:47:00 CES
---

In our application we've got a healtcheck endpoint.

Ofcourse this is used in `production` for monitoring purposes:

```ruby
# config/routes.rb
Rails.application.routes.draw do
  get "health_check" => "health_check#show"
end

# app/controllers/health_check_controller.rb
class HealthCheckController < ApplicationController
  layout false

  def show
    check_database_connection!
    check_redis_connection!
    check_search_connection!
    # etc
    return head :ok
  end
end
```

But in our `development` `docker-compose.yml` setup we use this as well (for startup reasons). But it doesn't need all the extra monitoring (like database check and stuff)

```yaml
services:
  rails:
    # ...
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health_check"]
      interval: 5s
      timeout: 2s
      start_period: 10s
      retries: 5
```

The downside of this is the noisy loglines it produces (5 lines!!):

```log
core-rails-1 | Started GET "/health_check" for 127.0.0.1 at 2023-07-21 09:41:00 +0200
core-rails-1 | Processing by HealthCheckController#show as */*
core-rails-1 | Completed 200 OK in 0ms (ActiveRecord: 0.0ms | Allocations: 223)
core-rails-1 |
core-rails-1 |
```

So I investigated to clean this up a bit into a one-liner by inserting some Rack Middleware to handle this request:

```ruby
# lib/middleware/health_check_responder.rb
class HealthCheckResponder
  def initialize(app, options = {})
    @app = app
  end

  def call(env)
    if env["REQUEST_PATH"] == "/health_check"
      # Use Rack::CommonLogger
      [200, {}, [""]]
    else
      @app.call(env)
    end
  end
end

# config/environments/development.rb
Rails.application.configure do
  # ...

  # Use a less chatty health_check in development
  require_relative "../../lib/middleware/health_check_responder"
  config.middleware.insert_before(0, HealthCheckResponder)
end
```

Voila! A one liner log:

```log
core-rails-1 | [17] 127.0.0.1 - - [21/Jul/2023:09:43:25 +0200] "GET /health_check HTTP/1.1" 200 - 0.0041
```


