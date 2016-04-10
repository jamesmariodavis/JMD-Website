<!DOCTYPE html>
<html lang="en">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<head>
    <link rel="stylesheet" type="text/css" href="/css/mechanics.css">
    <link rel="stylesheet" type="text/css" href="/css/style.css">
    <meta charset="UTF-8">
    <title>
        {% block head %}

        {% endblock head %}
    </title>
</head>

<body>

<div class="row jmd-purple">
    <div class="left top-name"> James Mario Davis </div>
</div>
<div class="row outer-center jmd-purple">
    <div class="inner-center top-nav">
        {% block top_nav %}

        {% endblock top_nav %}
    </div>
</div>

<div class="row outer-center">
    <div class="inner-center main-content">
        <div class="col-s-0 col-1"> </div>
        <div class="col-s-12 col-10 col-center">
            {% block content %}

            {% endblock content %}
        </div>
        <div class="col-s-0 col-1"> </div>
    </div>

</div>

</body>
</html>