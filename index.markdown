---
layout: home
title: "Ana Sayfa"
---

<section class="hero">
  <p class="hero-intro">$ whoami</p>
  <h1>ed.cybe.red</h1>
  <p class="hero-description">
    Kişisel site. İçeriği sen doldur.
  </p>
  <div class="hero-links">
    <a href="/yazilar/" class="primary">Yazıları Oku</a>
    <a href="/hakkimda/" class="secondary">Hakkımda</a>
  </div>
</section>

<!-- Acil Eylem Çağrıları -->
{% if site.data.urgent_actions.size > 0 %}
<section class="section">
  <div class="section-header">
    <h2>⚡ Acil Eylem Çağrıları</h2>
  </div>
  <div class="card-list">
    {% for action in site.data.urgent_actions %}
    <div class="card urgent-card">
      <span class="urgent-label">Acil</span>
      <h3 class="card-title">{{ action.title }}</h3>
      <p class="card-excerpt">{{ action.description }}</p>
      <a href="{{ action.url }}">Bu eyleme katıl →</a>
    </div>
    {% endfor %}
  </div>
</section>
{% endif %}

<!-- Son Notlar -->
{% if site.notes.size > 0 %}
<section class="section">
  <div class="section-header">
    <h2>Notlar</h2>
    <a href="/notlar/">Tümünü gör →</a>
  </div>
  <div class="notes-stream">
    {% assign sorted_notes = site.notes | sort: 'date' | reverse %}
    {% for note in sorted_notes limit:5 %}
    <div class="note-item">
      <div class="note-date">{{ note.date | date: "%d %B %Y" }}</div>
      <h3><a href="{{ note.url | relative_url }}">{{ note.title }}</a></h3>
      <p>{{ note.content | strip_html | truncatewords: 30 }}</p>
    </div>
    {% endfor %}
  </div>
</section>
{% endif %}

<!-- Son Blog Yazıları -->
{% if site.posts.size > 0 %}
<section class="section">
  <div class="section-header">
    <h2>Son Yazılar</h2>
    <a href="/blog/">Tümünü gör →</a>
  </div>
  <div class="card-list">
    {% for post in site.posts limit:3 %}
    <div class="card">
      <div class="card-meta">{{ post.date | date: "%d %B %Y" }}</div>
      <h3 class="card-title"><a href="{{ post.url | relative_url }}">{{ post.title }}</a></h3>
      <p class="card-excerpt">{{ post.excerpt | strip_html | truncatewords: 25 }}</p>
    </div>
    {% endfor %}
  </div>
</section>
{% endif %}

<!-- Boykot Listesi -->
{% if site.data.navigation.boycott.size > 0 %}
<section class="section">
  <div class="section-header">
    <h2>🚫 Boykot Listesi</h2>
  </div>
  <div class="boycott-grid">
    {% for item in site.data.navigation.boycott %}
    <div class="boycott-item">
      {{ item.name }}
      <span class="boycott-reason">{{ item.reason }}</span>
    </div>
    {% endfor %}
  </div>
</section>
{% endif %}
