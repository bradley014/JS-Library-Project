/*Library Constructor*/
var Library = function(instanceKey) {
  this.bookArray = new Array();
  this.instanceKey = instanceKey;
};

/* Local Storage */
Library.prototype.storage = function () {
  console.log(this.instanceKey);
  if (typeof(Storage) !== "undefined") {
    var myStr = JSON.stringify(this.bookArray);
    localStorage.setItem(this.instanceKey, myStr);
    console.log(localStorage.getItem('breakfast'));
  } else {
      // Sorry! No Web Storage support..
  }
};

Library.prototype.retrieveStorage = function () {
  if (typeof(Storage) !== "undefined") {
    var x = JSON.parse(localStorage.getItem(this.instanceKey));
    if (x !== null) {
      for (var i = 0; i < x.length; i++) {
        this.bookArray.push(x[i]);
      }
    }
  }

};

/*book constructor*/
var Book = function(args) {
  this.title = args.title;
  this.author = args.author;
  this.pages = args.pages;
  this.pubDate = new Date(args.pubDate);
};

// startUp function runs the bindEvents function (and other functions you want immediatelly activated)
Library.prototype.startUp = function() {
  this.bindEvents();
  this.retrieveStorage();
  this.displayLibraryArray(this.bookArray);
};

//bindEvents function runs the event listeners, Houses all event listenters/buttons
Library.prototype.bindEvents = function() {
    /*Buttons*/
    $("#addBookBtn").on('click', $.proxy(this.handleAddBook, this));
    $("#removeTitleBtn").on('click', $.proxy(this.handleRemoveBookByTitle, this));
    $("#removeAuthorBtn").on('click', $.proxy(this.handleRemoveBooksByAuthor, this));
    $("#randomBookBtn").on('click', $.proxy(this.handleGetRandomBook, this));
    $("#bookByTitleBtn").on('click', $.proxy(this.handleGetBookByTitle, this));
    $("#bookByAuthorBtn").on('click', $.proxy(this.handleGetBookByAuthor, this));
    $("#addBooksBtn").on('click', $.proxy(this.handleAddBooks, this));
    $("#addMoreBooksBtn").on('click', $.proxy(this.handleAddMoreBooks, this));
    $("#listAuthorsBtn").on('click', $.proxy(this.handleGetAuthors, this));
    $("#randomAuthorBtn").on('click', $.proxy(this.handleGetRandomAuthor, this));

    /*hides all query boxes after page loads*/
    $(".boxes").hide();
};


/************** HANDLER FUNCTIONS **************/

//ACTION when the corresponding button is pressed (in the event listener section)
/*Add Book Handler*/
Library.prototype.handleAddBook = function(args) {
  var newBook = new Book(args);
    newBook.title = $("#addBookTitle").val();
    newBook.author = $("#addBookAuthor").val();
    newBook.pages = $("#addBookPages").val();
    newBook.pubDate = new Date($("#addBookPubDate").val());
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

/*Get a book by its title handler*/
Library.prototype.handleGetBookByTitle = function() {
  var bookTitle = $("#inputGetTitle").val();
  this.getBookByTitle(bookTitle);
  $(".form-group").children('input').val('');
};

/*Get books by author name handler*/
Library.prototype.handleGetBookByAuthor = function() {
  var bookAuthor = $("#inputGetAuthor").val();
  this.getBooksByAuthor(bookAuthor);
  $(".form-group").children('input').val('');
};

/*Add multiple books handler*/
Library.prototype.handleAddBooks = function() {
  var titleArray = [], authorArray = [], pagesArray = [], pubDateArray = [];
  $('.addBookTitle').each(function() {
  titleArray.push($(this).val());
  })
  $('.addBookAuthor').each(function() {
  authorArray.push($(this).val());
  })
  $('.addBookPages').each(function() {
  pagesArray.push($(this).val());
  })
  $('.addBookPubDate').each(function() {
  pubDateArray.push($(this).val());
  })
  for (var i = 0; i < titleArray.length; i++) {
    this.addBook(new Book({title: titleArray[i], author: authorArray[i], pages: pagesArray[i], pubDate: pubDateArray[i]}));
  }
  $(".form-group").children('input').val('');
};

/*Adds multiple forms to add multiple books*/
Library.prototype.handleAddMoreBooks = function () {
  $(".books-input:last").clone().appendTo(".books-form");
  $(".form-group:last").children('input').val('');
};

/*List all authors in library handler*/
Library.prototype.handleGetAuthors = function() {
  this.getAuthors();
};

/*Get a random author handler*/
Library.prototype.handleGetRandomAuthor = function() {
  this.getRandomAuthorName();
};


/************** ORIGINAL JS FUNCTIONS **************/

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
  this.storage();
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

        this.displayLibraryArray(this.bookArray);
        this.storage();
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

        this.displayLibraryArray(this.bookArray);
        boolean = true;
    }
  }
  this.storage();
  return boolean;
};

/*function 4: Get random book from library function*/
Library.prototype.getRandomBook = function() {
  var x;
  var randomBook = Math.floor(Math.random() * this.bookArray.length);
  if (!this.bookArray.length) {
    return null;
  }
  x = this.bookArray[randomBook];
  this.displayRandomBook(x);
  return x;
};

/*function 5: Get book by Title function*/
Library.prototype.getBookByTitle = function(title) {
  var emptyArray = [];
  for (var i = 0; i < this.bookArray.length; i++) {
    var s = this.bookArray[i].title.toLowerCase();
    if (s.indexOf(title.toLowerCase()) > -1){
      emptyArray.push(this.bookArray[i]);
    }
  }
  this.displayBookByTitle(emptyArray);
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
  this.displayBookByAuthor(emptyArray);
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
  this.displayGetAuthors(filteredArray);
  return filteredArray;
};

/*Function 9: get a random author in library*/
Library.prototype.getRandomAuthorName = function() {
  var x;
  var randomAuthor = Math.floor(Math.random() * this.bookArray.length);
  if (!this.bookArray.length) {
    return null;
  }
  x = this.bookArray[randomAuthor].author;
  this.displayRandomAuthor(x);
  return x;
};


/************** DISPLAY FUNCTIONS **************/

/*displays current library array*/
Library.prototype.displayLibraryArray = function(array) {
  $('.lData').remove();
  //console.log(array.length);
  for (var i = 0; i < array.length; i++) {
    //console.log(i);
    this.displayAddBook(array[i]);
  }
};

/*Displays added book*/
Library.prototype.displayAddBook = function(book) {
  var newRow = $("<tr class='lData'>");
  var newTitle = $("<td>").text(book.title);
  var newAuthor = $("<td>").text(book.author);
  var newPages = $("<td>").text(book.pages);
  var newPubDate = $("<td>").text(book.pubDate);
  newRow.append(newTitle);
  newRow.append(newAuthor);
  newRow.append(newPages);
  newRow.append(newPubDate);
  $(".library-table").append(newRow);
  console.log("Added a book to library");
};

/*Displays a random book on search results table*/
Library.prototype.displayRandomBook = function(book) {
  $('.rData').remove();
  this.displaySearchResults(book);
};

/*Constructs and displays search results table*/
Library.prototype.displaySearchResults = function(book) {
  var newRow = $("<tr class='rData'>");
  var newTitle = $("<td>").text(book.title);
  var newAuthor = $("<td>").text(book.author);
  var newPages = $("<td>").text(book.pages);
  var newPubDate = $("<td>").text(book.pubDate);
  newRow.append(newTitle);
  newRow.append(newAuthor);
  newRow.append(newPages);
  newRow.append(newPubDate);
  $(".results-table").append(newRow);
  console.log("Added a book to Search Results");
};

/*Displays a random Author to search results table*/
Library.prototype.displayRandomAuthor = function(author) {
  $('.rData').remove();
  this.displaySearchResultsAuthor(author);
};

/*Constructs and displays author name to search results table*/
Library.prototype.displaySearchResultsAuthor = function(author) {
  var newRow = $("<tr class='rData'>");
  var newTitle = $("<td>")
  var newAuthor = $("<td>").text(author);
  var newPages = $("<td>")
  var newPubDate = $("<td>")
  newRow.append(newTitle);
  newRow.append(newAuthor);
  newRow.append(newPages);
  newRow.append(newPubDate);
  $(".results-table").append(newRow);
  console.log("Added an author to Search Results");
};

/*Displays book(s) retrieved by title(s) to search results table*/
Library.prototype.displayBookByTitle = function(book) {
  $('.rData').remove();
  this.displaySearchResultsTitleOrAuthor(book);
};

/*Displays book(s) retrieved by Author(s) to search results table*/
Library.prototype.displayBookByAuthor = function(book) {
  $('.rData').remove();
  this.displaySearchResultsTitleOrAuthor(book);
};

/*Constructs and displays book(s) retrieved by title(s) or author(s) to search results table*/
Library.prototype.displaySearchResultsTitleOrAuthor = function(book) {
  $.each(book, function(index, value) {
  var newRow = $("<tr class='rData'>");
  var newTitle = $("<td>").text(value.title);
  var newAuthor = $("<td>").text(value.author);
  var newPages = $("<td>").text(value.pages);
  var newPubDate = $("<td>").text(value.pubDate);
  newRow.append(newTitle);
  newRow.append(newAuthor);
  newRow.append(newPages);
  newRow.append(newPubDate);
  $(".results-table").append(newRow);
  });
  console.log("Added books by title or author to Search Results");
};

/*Displays list of Author(s) to search results table*/
Library.prototype.displayGetAuthors = function(authors) {
  $('.rData').remove();
  this.displaySearchResultsAuthors(authors);
};

/*Constructs and displays list of Author(s) to search results table*/
Library.prototype.displaySearchResultsAuthors = function(authors) {
  $.each(authors, function(index, value) {
  var newRow = $("<tr class='rData'>");
  var newTitle = $("<td>")
  var newAuthor = $("<td>").text(authors[index]);
  var newPages = $("<td>")
  var newPubDate = $("<td>")
  newRow.append(newTitle);
  newRow.append(newAuthor);
  newRow.append(newPages);
  newRow.append(newPubDate);
  $(".results-table").append(newRow);
  });
  console.log("Added list of authors to Search Results");
};


/************** NAVBAR TOGGLE FUNCTIONS **************/

/*clears current query box*/
  $("#home").on('click', function(){
    $(".boxes").hide(1000);
    $('.rData').remove();
  });

/*Toggles between query boxes as sidebar options are clicked*/
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


/************** DOCUMENT READY **************/

//runs when DOM loads, creates new instance of Library as myLibrary, calls startUp function
$(function(e){
  window.myLibrary = new Library("bradLibrary");
  window.myLibrary.startUp();
});


/************** LIBRARY BOOKS **************/

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
