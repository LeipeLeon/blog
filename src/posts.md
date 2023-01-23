---
layout: page
title: Posts
---

<ul>
<<<<<<< HEAD
  {% for post in collections.posts.resources %}
=======
  {% collections.posts.resources.each do |post| %}
>>>>>>> deebc40 (-c turbo,ruby2js,shoelace,lit,bt-postcss,render)
    <li>
      <a href="{{ post.relative_url }}">{{ post.data.title }}</a>
    </li>
  {% end %}
</ul>

If you have a lot of posts, you may want to consider adding [pagination](https://www.bridgetownrb.com/docs/content/pagination)!
