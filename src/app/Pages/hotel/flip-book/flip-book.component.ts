import { Component, OnInit } from '@angular/core';
// import { Book } from '@labsforge/flipbook';
interface Cover {
  front: BookPageSide;
  back: BookPageSide;
}

enum PageType {
  Single,
  Double
}

interface BookPageSide {
  imageUrl: string;
  backgroundColor?: string;
  opacity?: number;
}

interface Book {
  width: number;
  height: number;
  zoom: number;
  cover?: Cover;
  pages: BookPageSide[];
  pageWidth?: number;
  pageHeight?: number;
  startPageType?: PageType;
  endPageType?: PageType;
}
@Component({
  selector: 'app-flip-book',
  templateUrl: './flip-book.component.html',
  styleUrls: ['./flip-book.component.css']
})
export class FlipBookComponent implements OnInit {
  book: Book = {
    width: 1190,
      height: 800,
      zoom: 1,
      cover: {
        front: {
          imageUrl: 'assets/demo/02-right.png',
        },
        back: {
          imageUrl: 'assets/demo/02-left.png',
        }
      },
      pages: [
        { // start guard section
          imageUrl: 'assets/demo/guard.jpg',
          backgroundColor: '#41473A', // don't use if want to see front-cover inverted image
        },
        {
          imageUrl: 'assets/demo/guard.jpg',
        }, // end guard section
        { // start transparent-sheet section
          imageUrl: 'assets/demo/blank.jpg',
        },
        {
          imageUrl: 'assets/demo/01-left.png',
          opacity: 0.6,
        },
        {
          imageUrl: 'assets/demo/blank.jpg',
          opacity: 0.4,
        },
        {
          imageUrl: 'assets/demo/blank.jpg',
        }, // end transparent-sheet section
        {
          imageUrl: 'assets/demo/03-left.png',
        },
        {
          imageUrl: 'assets/demo/03-right.png',
        },
        {
          imageUrl: 'assets/demo/04-left.png',
        },
        {
          imageUrl: 'assets/demo/04-right.png',
        },
        {
          imageUrl: 'assets/demo/05-left.png',
        },
        {
          imageUrl: 'assets/demo/05-right.png',
        },
        {
          imageUrl: 'assets/demo/06-left.png',
        },
        {
          imageUrl: 'assets/demo/06-right.png',
        },
        { // start guard section
          imageUrl: 'assets/demo/guard.jpg',
        },
        {
          imageUrl: 'assets/demo/guard.jpg',
          backgroundColor: '#41473A', // don't use if want to see back-cover inverted image
        }, // end guard section
      ],
      pageWidth: 585,
      pageHeight: 780,
      startPageType: PageType.Double,
      endPageType: PageType.Double
  }
  constructor() { }

  ngOnInit() {
  }

}
