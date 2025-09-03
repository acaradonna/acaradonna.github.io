---
layout: default
title: Resume
---

<h1>Resume</h1>

## Education

{% for edu in site.data.resume.education %}
### {{ edu.school }}

- {{ edu.degree }} in {{ edu.major }}
- Graduated: {{ edu.graduation }}
{% if edu.gpa %}- GPA: {{ edu.gpa }}{% endif %}
{% if edu.honors %}
#### Honors
{% for honor in edu.honors %}
- {{ honor }}
{% endfor %}
{% endif %}
{% endfor %}

## Professional Experience

{% assign experience = site.data.resume.work | default: site.data.resume.experience %}
{% for exp in experience %}
### {{ exp.company }}
**{{ exp.position }}** ({{ exp.start_date }} - {{ exp.end_date }})  
{{ exp.location }}

{% if exp.highlights %}
{% for highlight in exp.highlights %}
- {{ highlight }}
{% endfor %}
{% endif %}
{% endfor %}

## Skills

{% for block in site.data.resume.skills %}
### {{ block.category | capitalize }}
{% for item in block.items %}
- {{ item }}
{% endfor %}
{% endfor %}

## Certifications

{% assign certifications = site.data.resume.certificates | default: site.data.resume.certifications %}
{% for cert in certifications %}
- [{{ cert.name }}]({{ cert.url }}) - {{ cert.issuer }} ({{ cert.date }})
{% endfor %}
