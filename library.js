/*Library Constructor*/
var Library = function() {
 this.bookArray = new Array();
};

/*instantiating Library object as "myLibrary"...*/
this.myLibrary = new Library();
//this.myLibraryTwo = new Library();

/*book constructor*/
var Book = function(args) {
  this.title = args.title;
  this.author = args.author;
  this.pages = args.pages;
  this.pubDate = new Date(args.pubDate);
};

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

/*Empty multiple book array*/
var arrayWithNoBooks = [];

/*function 1: add book function*/
Library.prototype.addBook = function(book) {
  if (typeof(book) === 'undefined' || typeof(book) === "number" || typeof(book) === "string") {
    return "Not a book";
  }
  for (var i = 0; i < this.bookArray.length; i++) {
     if (this.bookArray[i] === book) {
       return false;
    }
  }
  this.bookArray.push(book);
  return true;
};

/*function 2: Remove book by Title function*/
Library.prototype.removeBookByTitle = function(title) {
  if (typeof(title) === 'undefined' || typeof(title) === "number") {
    return "Not a title in your library";
  }
  for (var i = 0; i < this.bookArray.length; i++) {
     if (this.bookArray[i].title === title) {
        this.bookArray.splice(i, 1);
        return true;
    }
  }
  return false;
};

/*function 3: Remove book by Author function*/
Library.prototype.removeBooksByAuthor = function(author) {
  var b = false;
  for (var i = this.bookArray.length - 1; i >= 0; i--) {
     if (this.bookArray[i].author == author) {
        this.bookArray.splice(i, 1);
        b = true;
    }
  }
  return b;
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
    var s = this.bookArray[i].title.toLowerCase();
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

/*Function 10: Rubust search function, search by more than one property*/
// Library.prototype.search = function() {
//   for (var i = 0; i < this.bookArray.length; i++) {
//
//   }
// }

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
