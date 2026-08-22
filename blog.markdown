---
layout: page
title: "Blog"
permalink: /blog/
description: "Teknik yazılar, düşünceler ve güncellemeler."
---

<div class="card-list">
{% for post in site.posts %}
  <div class="card">
    <div class="card-meta">{{ post.date | date: "%d %B %Y" }}
      {% for cat in post.categories %}
      <span class="tag">{{ cat }}</span>
      {% endfor %}
    </div>
    <h3 class="card-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
    <p class="card-excerpt">{{ post.excerpt | strip_html | truncatewords: 40 }}</p>
  </div>
{% endfor %}

{% if site.posts.size == 0 %}
<p style="color: var(--text-muted); font-style: italic;">Henüz blog yazısı eklenmedi. Yakında burada yazılar olacak.</p>
{% endif %}
</div>
