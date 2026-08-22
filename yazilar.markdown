---
layout: page
title: "Yazılar"
permalink: /yazilar/
description: "Uzun biçimli makaleler ve denemeler."
---

<div class="card-list">
{% assign sorted_articles = site.articles | sort: 'date' | reverse %}
{% for article in sorted_articles %}
  <div class="card">
    <div class="card-meta">{{ article.date | date: "%B %Y" }}</div>
    <h3 class="card-title"><a href="{{ article.url | relative_url }}">{{ article.title }}</a></h3>
    {% if article.description %}
    <p class="card-excerpt">{{ article.description }}</p>
    {% else %}
    <p class="card-excerpt">{{ article.content | strip_html | truncatewords: 40 }}</p>
    {% endif %}
  </div>
{% endfor %}

{% if site.articles.size == 0 %}
<p style="color: var(--text-muted); font-style: italic;">Henüz makale eklenmedi.</p>
{% endif %}
</div>
