---
layout: default
title: Projects
---

{% for project in site.data.links.projects %}

## {{ project.name }}: [{{ project.description }}]({{ project.url }})

{% endfor %}
