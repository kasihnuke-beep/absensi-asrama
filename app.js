// Konfigurasi Firebase
var firebaseConfig = {
    apiKey: "YOUR-APIKEY",
    authDomain: "YOUR-PROJECT.firebaseapp.com",
    projectId: "YOUR-PROJECT-ID",
};
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// Submit Form
document.getElementById("absenForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let nama = document.getElementById("nama").value;
    let kamar = document.getElementById("kamar").value;
    let status = document.getElementById("status").value;

    db.collection("absensi").add({
        nama: nama,
        kamar: kamar,
        status: status,
        waktu: new Date().toLocaleString("id-ID")
    });

    alert("Absensi berhasil disimpan!");
    document.getElementById("absenForm").reset();
});

// Menampilkan Data
db.collection("absensi").orderBy("waktu", "desc").onSnapshot((snapshot) => {
    let table = "";
    snapshot.forEach((doc) => {
        let data = doc.data();
        table += `
            <tr>
                <td>${data.nama}</td>
                <td>${data.kamar}</td>
                <td>${data.status}</td>
                <td>${data.waktu}</td>
            </tr>`;
    });
    document.getElementById("dataAbsen").innerHTML = table;
});
