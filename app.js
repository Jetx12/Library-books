const title = document.getElementById("title");
const name = document.getElementById("name");

// --- PERBAIKAN DI SINI ---
// Ubah dari "const myLibrary = [];" menjadi baris di bawah ini:
// Kode ini bertugas mengambil data dari Local Storage saat refresh, jika kosong baru buat array baru []
let myLibrary = JSON.parse(localStorage.getItem("daftarBuku")) || [];

function Book(title, name) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.name = name;
}

function addBookToLibrary(title, name) {
  const newbook = new Book(title, name);
  myLibrary.push(newbook);

  // Jangan lupa panggil fungsi simpan ke storage
  simpanKeLocalStorage();
}

// Tambahkan fungsi pembantu untuk menyimpan agar kode Anda lebih rapi
function simpanKeLocalStorage() {
  localStorage.setItem("daftarBuku", JSON.stringify(myLibrary));
}

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isiNama = name.value;
  const isiJudul = title.value;

  if (isiJudul.trim() === "" || isiNama.trim() === "") return;

  addBookToLibrary(isiJudul, isiNama);
  displayBooks(); // Menampilkan langsung setelah tombol ditekan

  form.reset();
});

function displayBooks() {
  const showBooksContainer = document.querySelector(".show-books");
  showBooksContainer.innerHTML = "";

  myLibrary.forEach(function (book) {
    const bookCardHTML = `
      <div class="book-card" data-id="${book.id}">
        <div class="book-info">
          <h3>${book.title}</h3>
          <p>Oleh: ${book.name}</p>
        </div>
        <button class="delete-btn" onclick="deleteBook('${book.id}')">X</button>
      </div>
    `;
    showBooksContainer.insertAdjacentHTML("beforeend", bookCardHTML);
  });
}

// Menampilkan buku yang sudah tersimpan di Local Storage saat halaman pertama kali dibuka/di-refresh
displayBooks();

function deleteBook(bookId) {
  // Gunakan filter untuk menyaring data selain ID yang dihapus
  myLibrary = myLibrary.filter((book) => book.id !== bookId);

  // Simpan perubahan terbaru ke Local Storage dan gambar ulang layarnya
  simpanKeLocalStorage();
  displayBooks();
}
