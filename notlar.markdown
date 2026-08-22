---
layout: page
title: "Notlar"
permalink: /notlar/
description: "Günlük politik notlar ve kısa yorumlar."
---

<div class="notes-stream">
{% assign sorted_notes = site.notes | sort: 'date' | reverse %}
{% for note in sorted_notes %}
  <div class="note-item">
    <div class="note-date">{{ note.date | date: "%d %B %Y" }}</div>
    <h3><a href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
    <p>{{ note.content | strip_html | truncatewords: 40 }}</p>
  </div>
{% endfor %}

{% if site.notes.size == 0 %}
<p style="color: var(--text-muted); font-style: italic;">Henüz not eklenmedi.</p>
{% endif %}
</div>
