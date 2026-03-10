import { Component } from '@angular/core';
import { MatGridList, MatGridListModule } from '@angular/material/grid-list';
import { RouterOutlet } from '@angular/router';
import { Header } from "../components/header/header";

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, Header],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
