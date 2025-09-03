---
layout: default
title: Links
permalink: /links
---

<h1>Links</h1>

<h2>Contact</h2>
<ul>
{% for link in site.data.links.contact %}
  <li><a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.name }}</a></li>
{% endfor %}
</ul>

<h2>Projects</h2>
<ul>
{% for link in site.data.links.projects %}
  <li><a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.name }}</a></li>
{% endfor %}
</ul>

<h2>Resources</h2>
<ul>
{% for link in site.data.links.resources %}
  <li><a href="{{ link.url }}" target="_blank" rel="noopener noreferrer">{{ link.name }}</a></li>
{% endfor %}
</ul>
