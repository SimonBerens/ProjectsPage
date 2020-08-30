// YOUR NAME HERE
const username = "SimonBerens";

const api = "https://api.github.com";

fetch(`${api}/users/${username}`)
    .then(resp => resp.json())
    .then(user => {
        const u_name = user.name;
        const u_bio = user.bio;
        const u_repos = user.html_url;
        const u_mail = user.email;
        const u_ico = user.avatar_url;
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
        document.getElementById("about").innerHTML = html;
        const script = document.createElement('script');
        script.src = "https://buttons.github.io/buttons.js";
        document.body.append(script);
        document.head.append(`<link href='${u_ico}' rel="shortcut icon" type="image/x-icon" />`);
    });

Promise.all([
    fetch("colors.json").then(resp => resp.json()),
    fetch(`${api}/users/${username}/repos`).then(resp => resp.json())
]).then(([lang_colors, repos]) => {
    let html = "";
    repos.forEach((repo) => {
        const r_name = repo.name;
        const r_language = repo.language === null? "": repo.language;
        const r_desc = repo.description === null? "": repo.description;
        const r_url = repo.html_url;
        const start_html = "" +
            "<div class=\"container-fluid\">\n" +
            "    <div class=\"row multiple-items\">";
        const end_html = "" +
            "    </div>\n" +
            "</div>\n<div class=\'alert alert-light\' role=\'alert\' style=\'margin: 1%\'>\n    Made with ProjectsPage by <a href=\'https://simonberens.me\'> Simon Berens </a>\n</div>";
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
        document.getElementById("projects").innerHTML = start_html + html + end_html;
    })
});
