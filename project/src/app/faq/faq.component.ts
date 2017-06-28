import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'faq.component.html'
})

export class FaqComponent implements OnInit {

  email: string;
  password: string;
  error: string;

  constructor() { }

  ngOnInit() { }
}
