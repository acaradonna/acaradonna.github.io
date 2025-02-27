---
layout: default
title: Resume
---

## Education

{% raw %}
{% for edu in site.data.resume.education %}

### {{ edu.school }}

- {{ edu.degree }} in {{ edu.major }}
- Graduated: {{ edu.graduation }}
- GPA: {{ edu.gpa }}
  {% if edu.honors %}

#### Honors

{% for honor in edu.honors %}

- {{ honor }}
  {% endfor %}
  {% endif %}
  {% endfor %}

## Professional Experience

{% for exp in site.data.resume.experience %}

### {{ exp.company }}

**{{ exp.position }}** _({{ exp.start_date }} - {{ exp.end_date }})_  
{{ exp.location }}

{% for highlight in exp.highlights %}

- {{ highlight }}
  {% endfor %}
  {% endfor %}

## Skills

### Technical Skills

{% for skill in site.data.resume.skills.technical %}

- {{ skill }}
  {% endfor %}

### Soft Skills

{% for skill in site.data.resume.skills.soft %}

- {{ skill }}
  {% endfor %}

## Certifications

{% for cert in site.data.resume.certifications %}

- [{{ cert.name }}]({{ cert.url }}) - {{ cert.issuer }} ({{ cert.date }})
  {% endfor %}
  {% endraw %}
