// let myLibrary = [];

// function Book(name, author, pages, read) {
//   this.name = name;
//   this.author = author;
//   this.pages = pages;
//   this.read = read;
//   this.info = function() {
//     return (`${name} by ${author}, ${pages} pages, ${read}`)
//   }
// }
// /**********************************************************
//  * addBookToLibrary 
//  * takes user input and adds the new book object to the library array.
//  *********************************************************/
// function addBookToLibrary(name, author, pages, read) {
//     let book = new Book(name, author, pages, read);
//     myLibrary.push(book);

//     //sorts library by book name
//     myLibrary.sort(function(a,b) {
//       var textA = a.name.toUpperCase();
//       var textB = b.name.toUpperCase();
//       return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
//    });
   
//     render();
// }

// /**********************************************************
//  * render
//  * loops through array of Book objects and displays them in a table.
//  *********************************************************/
// function render() {

//   var output = "";
//   output += "<table id='myTable'>";
//   output += "<th>Book</th>";
//   output += "<th>Author</th>";
//   output += "<th>Pages</th>";
//   output += "<th>Have Read?</th>";
//   output += "<th>Toggle Read<br> Status</th>"
//   output += "<th>Delete</th>";

//   for (var i = 0; i < myLibrary.length; i++) {
//     output += `<tr id=${[i]}>`;
//     output += "<td>" + myLibrary[i].name + "</td>" +
//               "<td>" + myLibrary[i].author + "</td>" +
//               "<td>" + myLibrary[i].pages + "</td>" +
//               "<td>" + myLibrary[i].read + "</td>" +
//               "<td>" + "<input onClick='toggleStatus(this)' id='toggle' type='button'>" + "</td>" +
//               "<td>" + "<input onClick='removeBook(this)' class='btn' type='button'>" + "</td>";
//     output += "</tr>";
//   }
//     output += "</table>";
//     document.getElementById("content").innerHTML = output;
// }

/**********************************************************
 * openForm 
 * opens a form to add a new book to the array.
 *********************************************************/
function openForm() {
  document.getElementById("book-form").style.display = "block";
  document.getElementById("myForm").reset(); 
}

/**********************************************************
 * closeForm 
 * closes the form to add a new book to the array.
 *********************************************************/
function closeForm() {
  document.getElementById("book-form").style.display = "none";
}

// /**********************************************************
//  * saveBook 
//  * submits user data from form input and adds to the array.
//  **********************************************************/
// function saveBook() {
//   var book = document.getElementById("book").value;
//   console.log(book);
//   var author = document.getElementById("author").value;
//   var pages = document.getElementById("pages").value;
//   var radios = document.getElementsByName("status");
//   for (var i = 0; i < radios.length; i++) {
//      if (radios[i].checked) {
//         var read = radios[i].value;
//      }
//   }


//   addBookToLibrary(book, author, pages, read);
//   render();
// }

/**********************************************************
 * resetForm
 * resets value in form input boxes
 *********************************************************/
function resetForm() {
  document.getElementById("myForm").reset();
}

// /**********************************************************
//  * removeBook
//  * Deletes the selected book from array
//  *********************************************************/
// function removeBook(r) {

//    console.log(myLibrary.length);

//   var currentRow = r.parentNode.parentNode.rowIndex;
//   document.getElementById("myTable").deleteRow(currentRow);
//   console.log(currentRow);
  
  
//   for (var i = 0; i < myLibrary.length; i++) {
//     if (currentRow - 1 == i) {
//       var index = myLibrary[i];
//       console.log(index);
//       myLibrary.splice(i, 1);
//     }
//   }
//   console.log(myLibrary);
//   render();
// }

// /**********************************************************
//  * toggleStatus
//  * Changes read status on each click
//  *********************************************************/
// function toggleStatus(r) {
   
//    var currentRow = r.parentNode.parentNode.rowIndex;

//    for (var i = 0; i < myLibrary.length; i++) {
//       if (currentRow - 1 == i) {
//          if (myLibrary[i].read == "Yes") {
//             myLibrary[i].read = "No";
//          }
//          else if (myLibrary[i].read == "No") {
//             myLibrary[i].read = "Yes";
//          }
//       }
//    }
//    render();
// }



// addBookToLibrary("Dune", "Someone", 500, "Yes");
// addBookToLibrary("The Hobbit", "Tolkien", 400, "Yes");
// addBookToLibrary("Black Hawk Down", "Bowden", 400, "Yes");


// get data from database (not real time)
// database.collection('books').get().then((snapshot) => {
//    snapshot.docs.forEach(doc => {
//       renderBooks(doc);
//    })
// })


const bookList = document.querySelector('#myTable');
const form = document.querySelector('#myForm');

//render results to screen
function renderBooks(doc) {

   let tr = document.createElement('tr');
   let td = document.createElement('td');
   let name = document.createElement('td');
   let author = document.createElement('td');
   let pages = document.createElement('td');
   let read = document.createElement('td');
   let toggle = document.createElement('td');
   let cross = document.createElement('div');
   tr.setAttribute('data-id', doc.id);
   name.textContent = doc.data().name;
   author.textContent = doc.data().author;
   pages.textContent = doc.data().pages;
   read.textContent = doc.data().read;
   cross.textContent = 'X';
   toggle.innerHTML = "+";
   
   tr.appendChild(name);
   tr.appendChild(author);
   tr.appendChild(pages);
   tr.appendChild(read);
   tr.appendChild(toggle);
   tr.appendChild(cross);

   bookList.appendChild(tr);

   //delete data
   cross.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');
      console.log(id);
      database.collection('books').doc(id).delete();
   })

   //update read status
   toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');   
      let status = e.target.parentElement.childNodes[3].innerHTML;
      if (status == "Yes"){
         database.collection('books').doc(id).update({
            read: "No"
      })}
      if (status == "No"){
         database.collection('books').doc(id).update({
            read: "Yes"
      })}
   }, {merge: true});
}

//saving data
form.addEventListener('submit', (e) => {
   e.preventDefault();
   database.collection('books').add({
      author: form.author.value,
      name: form.book.value,
      pages: form.pages.value,
      read: form.status.value
   })
})


function updateBooks(doc) {
   let tr = bookList.querySelector('[data-id=' + doc.id + ']');
   tr.innerHTML = "";
   
   let name = document.createElement('td');
   let author = document.createElement('td');
   let pages = document.createElement('td');
   let read = document.createElement('td');
   let toggle = document.createElement('td');
   let cross = document.createElement('div');
   // tr.setAttribute('data-id', doc.id);
   name.textContent = doc.data().name;
   author.textContent = doc.data().author;
   pages.textContent = doc.data().pages;
   read.textContent = doc.data().read;
   cross.textContent = 'X';
   toggle.innerHTML = "+";
   
   tr.appendChild(name);
   tr.appendChild(author);
   tr.appendChild(pages);
   tr.appendChild(read);
   tr.appendChild(toggle);
   tr.appendChild(cross);

   // bookList.appendChild(tr);
   toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      let id = e.target.parentElement.getAttribute('data-id');   
      let status = e.target.parentElement.childNodes[3].innerHTML;
      if (status == "Yes"){
         database.collection('books').doc(id).update({
            read: "No"
      })}
      if (status == "No"){
         database.collection('books').doc(id).update({
            read: "Yes"
      })}
   }, {merge: true});


}

//real time listener that updates table when anything changes
database.collection('books').orderBy('name').onSnapshot(snapshot => {
   let changes = snapshot.docChanges();
   changes.forEach(change => {
      if(change.type == 'added'){
         renderBooks(change.doc);
      } else if(change.type == 'removed') {
         let tr = bookList.querySelector('[data-id=' + change.doc.id + ']');
         bookList.removeChild(tr);
      } else if(change.type == 'modified') {
         // let tr = bookList.querySelector('[data-id=' + change.doc.id + ']');
         // bookList.removeChild(tr);
         // renderBooks(change.doc);
         updateBooks(change.doc);
      }
   })
})