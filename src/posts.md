---
layout: page
title: Posts
paginate:
  collection: posts
---

<ul>
  {% for post in paginator.resources %}
    <li>
      <article >
        <a href="{{ post.relative_url }}">{{ post.data.date | date: "%Y-%m-%d" }} {{ post.data.title }}</a>
        <p>{{ post.data.description | truncate: 80 }}</p>
      </article>
    </li>
  {% endfor %}
</ul>

{% if paginator.total_pages > 1 %}
  <ul class="pagination">
    {% if paginator.previous_page %}
    <li>
      <a href="{{ paginator.previous_page_path }}">Previous Page</a>
    </li>
    {% endif %}
    {% if paginator.next_page %}
    <li>
      <a href="{{ paginator.next_page_path }}">Next Page</a>
    </li>
    {% endif %}
  </ul>
{% endif %}
