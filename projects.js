// YOUR NAME HERE
const username = "SimonBerens";

const api = "https://api.github.com";

$.ajax({
    url: `${api}/users/${username}`,
    type: "GET",
    contentType: 'application/json; charset=utf-8',
    success: (user) => {
        console.log(user);
        const u_name = user.name;
        const u_bio = user.bio;
        const u_repos = user.html_url;
        const u_mail = user.email;
        let html = `
<h1 class="display-3"> ${u_name} </h1>
<p class="lead"> ${u_bio} </p>
<hr class="my-4">
<p class="lead">
    <a class="github-button" href="${u_repos}" data-size="large" aria-label="Follow @${u_name} on GitHub">Follow ${u_name}</a>
</p>
    `;
        if (u_mail !== null) {
            html += `
<p> Contact me at <strong> <span class="email"> ${u_mail}  </span> </strong></p>
            `;
        }
        $("#about").html(html);
        const script = document.createElement('script');
        script.src = "https://buttons.github.io/buttons.js";
        $("body").append(script);

    },
    error: (jqXHR, textStatus, errorThrown) => {
        console.log(jqXHR, textStatus, errorThrown);
    },
    timeout: 120000
});

// get colors -> get repos -> make page
$.getJSON({
    url: "colors.json",
    contentType: 'application/json; charset=utf-8',
    success: (json) => {
        const lang_colors = json;
        console.log(lang_colors);
        $.ajax({
            url: `${api}/users/${username}/repos`,
            type: "GET",
            contentType: 'application/json; charset=utf-8',
            success: (response) => {
                console.log(response);
                let html = "";
                response.forEach((repo) => {
                    const r_name = repo.name;
                    const r_language = repo.language === null? "": repo.language; //todo check languages
                    const r_desc = repo.description === null? "": repo.description;
                    const r_url = repo.html_url;
                    const start_html = "" +
                        "<div class=\"container-fluid\">\n" +
                        "    <div class=\"row multiple-items\">";
                    const end_html = "" +
                        "    </div>\n" +
                        "</div>\n<div class=\'alert alert-light\' role=\'alert\' style=\'margin: 1%;\'>\n    Made with ProjectsPage by <a href=\'http://simonberens.me\'> Simon Berens </a>\n</div>";
                    html += `
<div class='col-sm-4 col-md-offset-4' style="margin-bottom: 3%">
    <div class='card' style='width: 100%; border: 2px solid ${lang_colors[r_language].color} '>
        <div class='card-body'>
            <h5 class='card-title'> <a href="${r_url}"> ${r_name} </a> </h5>
            <h6 class='card-subtitle mb-2 text-muted' > <span style="color: ${lang_colors[r_language].color};">${r_language} </span> </h6>
            <p class='card-text'> ${r_desc}</p>
        </div>
    </div>
</div>
                    `;
                    $("#projects").html(start_html + html + end_html);
                })
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR, textStatus, errorThrown);
            },
            timeout: 120000
        });
    },
    error: (jqXHR, textStatus, errorThrown) => {
        console.log(jqXHR, textStatus, errorThrown);
    },
    timeout: 120000
});