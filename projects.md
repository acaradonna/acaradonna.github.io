---
layout: default
title: Projects
permalink: /projects
---

<h1>Projects</h1>
<p class="lead">Selected repositories and experiments.</p>

<div class="grid">
{% for project in site.data.links.projects %}
  <a class="card" href="{{ project.url }}" target="_blank" rel="noopener noreferrer">
    <div class="repo-name">{{ project.name }}</div>
    <div class="repo-desc">{{ project.description | default: 'Repository' }}</div>
    <div class="badges">
      {% if project.language %}<span class="badge">{{ project.language }}</span>{% endif %}
      {% if project.stars %}<span class="badge muted">★ {{ project.stars }}</span>{% endif %}
      {% if project.topics %}
        {% for t in project.topics %}
          <span class="badge muted">#{{ t }}</span>
        {% endfor %}
      {% endif %}
    </div>
  </a>
{% endfor %}
</div>
