const form = doocument.getElementById("userForm");
const out = document.getElementById("out");

form.addEventListener("submit",async (e) => {
    const fd = new FormData(form);
    const payload = {
        name:fd.get("name"),
        lastname:fd.get("lastname"),
        birthday:fd.get("birthday"),
        city:fd.get("city"),
        phone_number:fd.get("phone_number"),
        group_id: NUmber(fd.get("group_id")),
    };


const r = await fetch("http://localhost:5000/api/users",{
    method:"POST",
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify(payload),
});

out.textContent = `HTTP ${r.status}\n${await r.text()}`;
});