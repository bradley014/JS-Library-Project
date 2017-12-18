/*Library Constructor*/
var Library = function(instanceKey) {
  this.bookArray = new Array();
  this.intanceKey = instanceKey;
};

/*instantiating Library object as "myLibrary"...*/
//var myLibrary = new Library();

/*book constructor*/
var Book = function(args) {
  this.title = args.title;
  this.author = args.author;
  this.pages = args.pages;
  this.pubDate = new Date(args.pubDate);
};

// startUp function runs the bindEvents function (and other functions you want immediatelly activated), so all event listeners are activated when DOM loads
Library.prototype.startUp = function() {
  this.bindEvents();
}

//bindEvents function runs the event listeners, Houses all event listenters/buttons
Library.prototype.bindEvents = function() {
    $("#addBookBtn").on('click', $.proxy(this.handleAddBook, this));
    $("#removeTitleBtn").on('click', $.proxy(this.handleRemoveBookByTitle, this));
    $("#removeAuthorBtn").on('click', $.proxy(this.handleRemoveBooksByAuthor, this));
    $("#randomBookBtn").on('click', $.proxy(this.handleGetRandomBook, this));
    $("#bookByTitleBtn").on('click', $.proxy(this.handleGetBookByTitle, this));
    $("#bookByAuthorBtn").on('click', $.proxy(this.handleGetBookByAuthor, this));
    $("#addBooksBtn").on('click', $.proxy(this.handleAddBooks, this));
    $("#listAuthorsBtn").on('click', $.proxy(this.handleGetAuthor, this));
    $("#randomAuthorBtn").on('click', $.proxy(this.handleGetRandomAuthor, this));

    /*disable and enable button*/
    $(".form-group input[type=submit]").attr('disabled', 'disabled');
    // When User Fills Out Form Completely
    $(".form-group button").keyup(function(){
    $(".form-group input[type=submit]").removeAttr('disabled');
    });
};

//ACTION when the corresponding button is pressed (in the event listener section)
/*Add Book Handler*/
Library.prototype.handleAddBook = function(args) {
  var newBook = new Book(args);
    newBook.title = $("#addBookTitle").val();
    newBook.author = $("#addBookAuthor").val();
    newBook.pages = $("#addBookPages").val();
    newBook.pubDate = $("#addBookPubDate").val();
    this.addBook(newBook);
    $(".form-group").children('input').val('');
};
/*Remove book by title handler*/
Library.prototype.handleRemoveBookByTitle = function() {
  var bookTitle = $("#inputRemoveTitle").val();
  this.removeBookByTitle(bookTitle);
  $(".form-group").children('input').val('');
};
/*Remove books by author handler*/
Library.prototype.handleRemoveBooksByAuthor = function() {
  var bookAuthor = $("#inputRemoveAuthor").val();
  this.removeBooksByAuthor(bookAuthor);
  $(".form-group").children('input').val('');
};
/*Get a random book handler*/
Library.prototype.handleGetRandomBook = function() {
  this.getRandomBook();
};

Library.prototype.handleGetBookByTitle = function() {};

Library.prototype.handleGetBookByAuthor = function() {};

Library.prototype.handleAddBooks = function() {};

Library.prototype.handleGetAuthor = function() {};

Library.prototype.handleGetRandomAuthor = function() {};


/************* DISPLAY FUNCTIONS *************/
/*displays current book array*/
Library.prototype.displayArray = function(array) {
  $('.data').remove();
  //console.log(array.length);
  for (var i = 0; i < array.length; i++) {
    //console.log(i);
    this.displayAddBook(array[i]);
  }
};

/*Display search results*/
Library.prototype.displaySearchResults = function() {

};

/*Displays added book*/
Library.prototype.displayAddBook = function(book) {
  var newRow = $("<tr class='data'>");
  var newTitle = $("<td>").text(book.title);
  var newAuthor = $("<td>").text(book.author);
  var newPages = $("<td>").text(book.pages);
  var newPubDate = $("<td>").text(book.pubDate);
  newRow.append(newTitle);
  newRow.append(newAuthor);
  newRow.append(newPages);
  newRow.append(newPubDate);
  $(".library-table").append(newRow);
  console.log("test");
};


//runs when DOM loads, creates new instance of Library as myLibrary, calls startUp function
$(function(e){
  window.myLibrary = new Library("bradLibrary");
  window.myLibrary.startUp();
});


/*ORIGINAL JS FUNCTIONS*/
/*function 1: add book function*/
Library.prototype.addBook = function(book) {
  if (typeof(book) === 'undefined' || typeof(book) === "number" || typeof(book) === "string") {
    return "Not a book";
  }
  for (var i = 0; i < this.bookArray.length; i++) {
     if (this.bookArray[i].title === book.title) {
       return false;
    }
  }
  this.bookArray.push(book);
  this.displayAddBook(book);
  return true;
};

/*function 2: Remove book by Title function*/
Library.prototype.removeBookByTitle = function(title) {
  if (typeof(title) === 'undefined' || typeof(title) === "number") {
    return "Not a title in your library";
  }
  for (var i = 0; i < this.bookArray.length; i++) {
     if (this.bookArray[i].title.toLowerCase() === title.toLowerCase()) {
        this.bookArray.splice(i, 1);

        this.displayArray(this.bookArray);
        return true;
    }
  }
  return false;
};

/*function 3: Remove book by Author function*/
Library.prototype.removeBooksByAuthor = function(author) {
  var boolean = false;
  for (var i = this.bookArray.length - 1; i >= 0; i--) {
     if (this.bookArray[i].author.toLowerCase() === author.toLowerCase()) {
        this.bookArray.splice(i, 1);

        this.displayArray(this.bookArray);
        boolean = true;
    }
  }
  return boolean;
};

/*function 4: Get random book from library function*/
Library.prototype.getRandomBook = function() {
  if (!this.bookArray.length) {
    return null;
  }
  return this.bookArray[Math.floor(Math.random() * this.bookArray.length)];
};

/*function 5: Get book by Title(s) function*/
Library.prototype.getBookByTitle = function(title) {
  var emptyArray = [];
  for (var i = 0; i < this.bookArray.length; i++) {
    var s = this.bookArray[i].title.toLowerCase(); //don't use 'string' it's a key word
    if (s.indexOf(title.toLowerCase()) > -1){
      emptyArray.push(this.bookArray[i]);
    }
  }
  return emptyArray;
};

/*function 6: Get book by Author(s) function*/
Library.prototype.getBooksByAuthor = function(author) {
  var emptyArray = [];
  for (var i = 0; i < this.bookArray.length; i++) {
     if (this.bookArray[i].author.toLowerCase().indexOf(author.toLowerCase()) > -1) {
    emptyArray.push(this.bookArray[i]);
    }
  }
  return emptyArray;
};

/*function 7: add books function*/
Library.prototype.addBooks = function(books) {
  var countBooks = 0;
  for (var i = 0; i < books.length; i++) {
     if (this.addBook(books[i])) {
       countBooks++;
    }
  }
  return countBooks;
};

/*function 8: Grab all authors in library*/
Library.prototype.getAuthors = function() {
  var emptyArray = [];
  for (var i = 0; i < this.bookArray.length; i++) {
     if (this.bookArray[i].author) {
    emptyArray.push(this.bookArray[i].author);
    var filteredArray = emptyArray.filter(function (value, index, array) {return array.indexOf(value) == index; });
    }
  }
  return filteredArray;
};

/*Function 9: get a random author in library*/
Library.prototype.getRandomAuthorName = function() {
  if (!this.bookArray.length) {
    return null;
  }
  return this.bookArray[Math.floor(Math.random() * this.bookArray.length)].author;
};

// /*Function 10: Rubust search function, search by more than one property...working*/
// Library.prototype.search = function(book) {
//   for (var i = 0; i < this.bookArray.length; i++) {
//     //var book = this.bookArray[i];
//     switch (book) {
//       case this.bookArray[i] === book:
//         return "test";
//         break;
//       default:
//         return "default";
//     }
//   }
// };



/*Individual Books created using book constructor*/
var bookOne = new Book({title: "Collusion", author: "Harding", pages: 368, pubDate: "01/01/2001"});
var bookTwo = new Book({title: "The Glass Castle", author: "Walls", pages: 288, pubDate: "01/02/2002"});
var bookThree = new Book({title: "Being Mortal", author: "Gawande", pages: 304, pubDate: "01/03/2003"});
var bookFour = new Book({title: "The Undoing Project", author: "Lewis", pages: 369, pubDate: "01/04/2004"});
var bookFive = new Book({title: "Thinking Fast and Slow", author: "Kahneman", pages: 528, pubDate: "01/05/2005"});
var bookSix = new Book({title: "Another Book", author: "Kahneman", pages: 538, pubDate: "01/06/2006"});
var bookSeven = new Book({title: "Yet Another Book", author: "Kahneman", pages: 548, pubDate: "01/07/2007"});
var bookEight = new Book({title: "Kahneman's Brother", author: "Kahneman's Evil Twin", pages: 548, pubDate: "01/07/2007"});

/*multiple book array*/
var multipleBooks = [
  new Book({title: "Sorcerer's Stone", author: "J. K. Rowling", pages: 309, pubDate: "1997"}),
  new Book({title: "Chamber of Secrets", author: "J. K. Rowling", pages: 341, pubDate: "1998"}),
  new Book({title: "Prisoner of Azkaban", author: "J. K. Rowling", pages: 435, pubDate: "1999"})
];

/*Testing*/
// console.log(myLibrary.addBook(bookOne)); //1. add a book, return true
// console.log(myLibrary.addBook(bookOne)); //add the same book, return false
// console.log(myLibrary.removeBookByTitle("Collusion")); //2. remove book by title, return true
// console.log(myLibrary.removeBookByTitle("Collusion")); //remove book not in library, return false
// console.log(myLibrary.addBook(bookTwo)); //add some more books to library
// console.log(myLibrary.addBook(bookThree));
// console.log(myLibrary.addBook(bookFour));
// console.log(myLibrary.addBook(bookFive));
// console.log(myLibrary.addBook(bookSix));
// console.log(myLibrary.bookArray);
// console.log(myLibrary.removeBooksByAuthor("Walls")); //3. remove a book by author name, return true
// console.log(myLibrary.bookArray);
// console.log(myLibrary.removeBooksByAuthor("Walls")); //remove a book by author not in library, return false
// console.log(myLibrary.removeBooksByAuthor("Kahneman")); //remove multiple books by author
// console.log(myLibrary.bookArray);
// console.log(myLibrary.getRandomBook()); //4. get a random book in Library
// console.log(myLibrary.getBookByTitle("Being Mortal")); //5. get book by title
// console.log(myLibrary.getBookByTitle("t")); //get books by partial text
// console.log(myLibrary.addBook(bookSix)); //add books back into library
// console.log(myLibrary.addBook(bookSeven));
// console.log(myLibrary.addBook(bookEight));
// console.log(myLibrary.getBooksByAuthor("Kahn")); //6. get book(s) by author name, return array of books
// console.log(myLibrary.addBooks(multipleBooks)); //7. Add multiple books as an array, return number
// console.log(myLibrary.addBooks(multipleBooks)); //return number zero if no books are added
// console.log(myLibrary.getAuthors()); //8. get all author names in library
// console.log(myLibrary.getRandomAuthorName()); //9. get a random author's name in library

/*JQUERY*/
/*hides all query boxes after page loads*/
// note: the $(function... is equivalent to $(document).ready(function...
$(function(){
  $(".boxes").hide();
});

/*clears current query box*/
$(function(){
  $("#home").on('click', function(){
    $(".boxes").hide(1000);
  });
});

/*toggles between query boxes as sidebar options are clicked*/
  $("#btnOne").on('click', function(){
    $(".boxes").filter(".boxOne").toggle(1000);
    $(".boxTwo, .boxThree, .boxFour, .boxFive, .boxSix, .boxSeven, .boxEight, .boxNine").hide();
  });
  $("#btnTwo").on('click', function(){
    $(".boxes").filter(".boxTwo").toggle(1000);
    $(".boxOne, .boxThree, .boxFour, .boxFive, .boxSix, .boxSeven, .boxEight, .boxNine").hide();
  });
  $("#btnThree").on('click', function(){
    $(".boxes").filter(".boxThree").toggle(1000);
    $(".boxOne, .boxTwo, .boxFour, .boxFive, .boxSix, .boxSeven, .boxEight, .boxNine").hide();
  });
  $("#btnFour").on('click', function(){
    $(".boxes").filter(".boxFour").toggle(1000);
    $(".boxOne, .boxTwo, .boxThree, .boxFive, .boxSix, .boxSeven, .boxEight, .boxNine").hide();
  });
  $("#btnFive").on('click', function(){
    $(".boxes").filter(".boxFive").toggle(1000);
    $(".boxOne, .boxTwo, .boxThree, .boxFour, .boxSix, .boxSeven, .boxEight, .boxNine").hide();
  });
  $("#btnSix").on('click', function(){
    $(".boxes").filter(".boxSix").toggle(1000);
    $(".boxOne, .boxTwo, .boxThree, .boxFour, .boxFive, .boxSeven, .boxEight, .boxNine").hide();
  });
  $("#btnSeven").on('click', function(){
    $(".boxes").filter(".boxSeven").toggle(1000);
    $(".boxOne, .boxTwo, .boxThree, .boxFour, .boxFive, .boxSix, .boxEight, .boxNine").hide();
  });
  $("#btnEight").on('click', function(){
    $(".boxes").filter(".boxEight").toggle(1000);
    $(".boxOne, .boxTwo, .boxThree, .boxFour, .boxFive, .boxSix, .boxSeven, .boxNine").hide();
  });
  $("#btnNine").on('click', function(){
    $(".boxes").filter(".boxNine").toggle(1000);
    $(".boxOne, .boxTwo, .boxThree, .boxFour, .boxFive, .boxSix, .boxSeven, .boxEight").hide();
  });



// $(function(){
//     Library.prototype.secondFunction() {
//       myLibrary.handleAddBook();
//         // var title = "<strong>Title: </strong>" + $("#addBookTitle").val() + ", ";
//         // var author = "<strong>Author: </strong>" + $("#addBookAuthor").val() + ", ";
//         // var pages = "<strong>Pages: </strong>" + $("#addBookPages").val() + ", ";
//         // var date = "<strong>Pub Date: </strong>" + $("#addBookPubDate").val();
//         $(".libraryColumn").append("<p><strong>Title: </strong>" + $("book.title").val() + " " + "<strong>Author: </strong>" + $("book.author").val() + " " + "<strong>Pages: </strong>" + $("book.pages").val() + "<strong>Pub Date: </strong>" + $("book.pubDate").val() + " " + "</p>");
//   }
// });

// {title: "Collusion", author: "Harding", pages: 368, pubDate: "01/01/2001"}
