import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";
import { Sidenav } from "../components/sidenav/sidenav";

@Component({
  selector: 'app-home',
  imports: [MatGridListModule, Header, Footer, Sidenav],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
