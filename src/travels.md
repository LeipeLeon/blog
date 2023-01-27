---
layout: travels/post
title: Travels
---

{% rendercontent "travels/item", heading: "List of travel posts"%}

<ul>
  {% for item in collections.travels.resources %}
    <li>
      <article >
        <a href="{{ item.relative_url }}">{{ item.data.title }}</a>
      </article>
    </li>
  {% endfor %}
</ul>

{% endrendercontent %}
