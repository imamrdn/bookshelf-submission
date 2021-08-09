const UNCOMPLETED_LIST_BOOK_ID = "uncompleteBookshelfList";
const COMPLETED_LIST_BOOK_ID = "completeBookshelfList";
const BOOK_ITEMID = "itemId";

function makeBook(title, author, year, isCompleted) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;
    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;
    textAuthor.className = "author-book";
    const textYear = document.createElement("p");
    textYear.innerText = year;
    textYear.className ="year-book";
    
    const textContainer = document.createElement("article");
    textContainer.classList.add("book_item");

    textContainer.append(textTitle, textAuthor, textYear);
    
    if(isCompleted){
        textContainer.append(
            createDeleteButton(),
            createUndoButton()
        );
    } else {
        textContainer.append(
            createDoneButton()
        );
    }

    return textContainer;
}

function createGreenButton(eventListener) {
    const buttonDone = document.createElement("button");
    buttonDone.classList.add("green");
    buttonDone.innerText = "Done";

    buttonDone.addEventListener("click", function(event){
        eventListener(event);
    });

    return buttonDone;
}

function createRedButton(eventListener) {
    const buttonDelete = document.createElement("button");
    buttonDelete.classList.add("red");
    buttonDelete.innerText = "Delete";

    buttonDelete.addEventListener("click", function(event){
        eventListener(event);
    });

    return buttonDelete;
}

function createBlueButton(eventListener) {
    const buttonUndo = document.createElement("button");
    buttonUndo.classList.add("blue");
    buttonUndo.innerText = "Undo";

    buttonUndo.addEventListener("click", function(event){
        eventListener(event);
    });

    return buttonUndo;
}

function createUndoButton() {
    return createBlueButton(function(event){
        undoBookFromCompleted(event.target.parentElement);
    });
}

function createDoneButton() {
    return createGreenButton(function(event) {
       addBookToComplete(event.target.parentElement); 
    });
}

function createDeleteButton() {
    return createRedButton(function(event){
        removeBookFromCompleted(event.target.parentElement);
    });
}

function addBook() {
    const uncompletedBOOKList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const completedBOOKList = document.getElementById(COMPLETED_LIST_BOOK_ID);

    const titleBook = document.getElementById("inputBookTitle").value;
    const authorBook = document.getElementById("inputBookAuthor").value;
    const yearBook = document.getElementById("inputBookYear").value;
    const checkBook = document.getElementById("inputBookIsComplete");

    if (checkBook.checked == true){
        const book = makeBook(titleBook, authorBook, yearBook, true);
        const bookObject = composeBookObject(titleBook, authorBook, yearBook, true);
        
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        
        completedBOOKList.append(book);
    } else {
        const book = makeBook(titleBook, authorBook, yearBook, false);
        const bookObject = composeBookObject(titleBook, authorBook, yearBook, false);
        
        book[BOOK_ITEMID] = bookObject.id;
        books.push(bookObject);
        
        uncompletedBOOKList.append(book);
    }

    updateDataToStorage();
}

function addBookToComplete(bookElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const listTitle = bookElement.querySelector(".book_item > h3").innerText;
    const listAuthor = bookElement.querySelector(".book_item > .author-book").innerText;
    const listYear = bookElement.querySelector(".book_item > .year-book").innerText;

    const newBook = makeBook(listTitle, listAuthor, listYear, true);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = true;
    newBook[BOOK_ITEMID] = book.id;
    
    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    
    bookElement.remove();
    updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const listTitle = bookElement.querySelector(".book_item > h3").innerText;
    const listAuthor = bookElement.querySelector(".book_item > .author-book").innerText;
    const listYear = bookElement.querySelector(".book_item > .year-book").innerText;

    const newBook = makeBook(listTitle, listAuthor, listYear, false);
    const book = findBook(bookElement[BOOK_ITEMID]);
    book.isCompleted = false;
    newBook[BOOK_ITEMID] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

// function filterBook(val) {
//     val = val.toUpperCase();
//     let item = document.getElementsByClassName('book_item');

//     Array.prototype.forEach.call(item, child => {
//         let id = child.id.toUpperCase();
//         if(!id.includes(val)){
//             child.style.display = "none";
//         } else {
//             child.style.display = "block";
//         }
//     });

// }