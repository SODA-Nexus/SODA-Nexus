---
layout: page
title: Members
permalink: /projects/
description: 
nav: true
nav_order: 2
display_categories: [lab lead, nexus, alumni]
horizontal: true
img: assets/img/group.jpg
img2: assets/img/group2.jpg
---

<!-- pages/projects.md -->
<div class="projects">
{%- if site.enable_project_categories and page.display_categories %}
  <!-- Display categorized projects -->
  {%- for category in page.display_categories %}
  <h2 class="team">{{ category }}</h2>
  {%- assign categorized_projects = site.projects | where: "category", category -%}
  {%- assign sorted_projects = categorized_projects | sort: "importance" %}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-3">
    {%- for project in sorted_projects -%}
      {% unless project.bio %}
        {% include projects_horizontal.html %}
      {% endunless %}
    {%- endfor %}
    </div>
    {%- for project in sorted_projects -%}
      {% if project.bio %}
      <div>
        <div style="float:left; margin-right:1rem; max-width:13.5rem;">
          <div class="card-item col">
            <div class="card hoverable">
              <div class="card-img">
                {% include figure.html path=project.img alt="project thumbnail"%}
              </div>
            </div>
          </div>
        </div>
        <div> {{ project.content }} </div>
      </div>
      {% endif %}
    {%- endfor %}
  </div>
  {%- else -%}
  <div class="grid text-center">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
  {% endfor %}

{%- else -%}
<!-- Display projects without categories -->
  {%- assign sorted_projects = site.projects | sort: "importance" -%}
  <!-- Generate cards for each project -->
  {% if page.horizontal -%}
  <div class="container">
    <div class="row row-cols-3">
    {%- for project in sorted_projects -%}
      {% unless project.bio %}
        {% include projects_horizontal.html %}
      {% endunless %}    
    {%- endfor %}
    </div>
    {%- for project in sorted_projects -%}
      {% if project.bio %}
        <div>
          <div style="float:left; margin-right:1rem">
            <div class="card-item col">
              <div class="card hoverable">
                <div class="card-img col-md-6">
                  {% include figure.html path=project.img alt="project thumbnail" %}
                </div>
              </div>
            </div>
          </div>
          <div> {{ project.content }} </div>
        </div>
      {% endif %}
    {%- endfor %}
  </div>
  {%- else -%}
  <div class="grid">
    {%- for project in sorted_projects -%}
      {% include projects.html %}
    {%- endfor %}
  </div>
  {%- endif -%}
{%- endif -%}
</div>