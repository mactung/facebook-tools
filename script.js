let accessToken = null;
const facebookApiV6 = "https://graph.facebook.com/v6.0";
let ids = null;
let content = null;
$(function () {
    if (localStorage['accessToken']) {
        accessToken = localStorage['accessToken']
        $("#access-token-input").val(accessToken)
    }
})
/// token and id
$("#id-input").change(function () {
    ids = $(this).val().split(",")
        .map(str => str.trim())
        .filter(str => str !== "")
    console.log(ids)
})
$("#access-token-input").change(function () {
    accessToken = $(this).val();
    localStorage['accessToken'] = accessToken;
});

// content
$("#content").change(function () {
    content = $(this).val();
    console.log('content', content)
})
$("#btn-post").click(() => {
    let formData = new FormData();
    formData.append("message", content);
    formData.append("formating", "MARKDOWN");
    console.log(formData)
    let promises = ids.map(id => fetch(
        `${facebookApiV6}/${id}/feed?access_token=${accessToken}`,
        {
            method: "POST",
            body: formData,
        }
    ))
    Promise.all(promises)
        .then(data => {
            console.log(data)
        }).catch(err => console.log(err))

})


$("#btn-get-uid").click(async () => {
    fetch(`${facebookApiV6}/${id}/members?access_token=${accessToken}`)
        .then(data => data.json()).then(data => console.log(data))
        .catch((err) => reject(err))

})

