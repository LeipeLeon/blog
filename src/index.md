---
# Feel free to add content and custom Front Matter to this file.

layout: default
---

# Hi there!

My name is **Leon Berenschot**.

This is my personal website w/ some ramblings and insights I'm encountering while building a SaaS product called [Memoriam.tv](https://www.memoriam.tv)

The design is sparse b/c I'm a backender but there will be progress!

## You can reach me w/:

- e-mail: <mailto:leon@wendbaar.nl>
- mastodon: <https://ruby.social/@locoleon>

---

## Latest blog posts:

{% for post in collections.posts.resources %}
<article>
  <a href="{{ post.relative_url }}"><h2>{{ post.data.title }}</h2></a>
  <p>{{ post.summary | strip_html | truncate: 80 }}</p>
</article>
{% endfor %}
