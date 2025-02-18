---
layout: default
title: Links
---

# Links

## Contact

{% for link in site.data.links.contact %}
- [{{ link.name }}]({{ link.url }})
{% endfor %}

## Projects

{% for link in site.data.links.projects %}
- [{{ link.name }}]({{ link.url }})
{% endfor %}

## Resources

{% for link in site.data.links.resources %}
- [{{ link.name }}]({{ link.url }})
{% endfor %}
